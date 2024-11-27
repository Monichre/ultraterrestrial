import { internalMutation, internalAction } from "./_generated/server";
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { ExecuteError } from "convex/server";

// Helper function to execute shell commands
async function executeCommand(command: string): Promise<{ success: boolean; output?: string; error?: any }> {
  return new Promise((resolve) => {
    const { exec } = require("child_process");
    exec(command, { maxBuffer: 1024 * 1024 * 10 }, (error: any, stdout: string, stderr: string) => {
      if (error) {
        resolve({ success: false, error: error.message });
        return;
      }
      if (stderr) {
        resolve({ success: false, error: stderr });
        return;
      }
      resolve({ success: true, output: stdout });
    });
  });
}

// Function to process CSV data
function parseCSV(csvContent: string) {
  const lines = csvContent.trim().split("\n");
  if (lines.length < 2) return { headers: [], records: [] };

  const headers = lines[0].split(",").map(h => h.trim());
  const records = lines.slice(1).map(line => {
    const values = line.split(",").map(v => v.trim());
    return headers.reduce((obj: any, header, index) => {
      let value = values[index];
      if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (!isNaN(Number(value)) && value !== "") value = Number(value);
      obj[header] = value;
      return obj;
    }, {});
  });

  return { headers, records };
}

// Main sync function
export const syncFromXata = internalMutation({
  handler: async (ctx) => {
    console.log("Starting Xata to Convex sync...");
    const syncStats = {
      startTime: new Date().toISOString(),
      tablesProcessed: 0,
      recordsCreated: 0,
      recordsUpdated: 0,
      recordsDeleted: 0,
      errors: [] as string[]
    };

    try {
      // 1. Create export directory if it doesn't exist
      const exportDir = "../exports/xata";
      await executeCommand(`mkdir -p ${exportDir}`);

      // 2. Export from Xata using xata_tools
      console.log("Exporting data from Xata...");
      const exportCommand = `python3 xreplay.py \
        --from_workspace UltraTerrestrial-kgubvq \
        --from_database ultraterrestrial \
        --from_branch main \
        --from_region us-east-1 \
        --from_XATA_API_KEY xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1 \
        --output file \
        --output_path ${exportDir} \
        --output_format csv`;

      const exportResult = await executeCommand(exportCommand);
      if (!exportResult.success) {
        throw new Error(`Xata export failed: ${exportResult.error}`);
      }

      // 3. Get list of exported files
      const { output: fileList } = await executeCommand(`ls ${exportDir}`);
      if (!fileList) {
        throw new Error("No files found in export directory");
      }

      const files = fileList.split("\n").filter(f => f.endsWith(".csv"));
      console.log(`Found ${files.length} tables to sync`);

      // 4. Process each CSV file
      for (const file of files) {
        const tableName = file.replace(".csv", "");
        console.log(`Processing table: ${tableName}`);

        try {
          // Read CSV file
          const { output: csvContent } = await executeCommand(`cat ${exportDir}/${file}`);
          if (!csvContent) {
            throw new Error(`Failed to read CSV file for table ${tableName}`);
          }

          const { records } = parseCSV(csvContent);
          const existingRecords = await ctx.db.query(tableName).collect();
          const existingIds = new Set(existingRecords.map(r => r.xata_id));

          // Process each record
          for (const record of records) {
            const xataId = record.id || record.xata_id;
            if (!xataId) continue;

            try {
              if (existingIds.has(xataId)) {
                // Update existing record
                const existingRecord = existingRecords.find(r => r.xata_id === xataId);
                if (existingRecord) {
                  await ctx.db.patch(existingRecord._id, record);
                  syncStats.recordsUpdated++;
                }
              } else {
                // Insert new record
                await ctx.db.insert(tableName, { ...record, xata_id: xataId });
                syncStats.recordsCreated++;
              }
            } catch (error) {
              syncStats.errors.push(`Error processing record in ${tableName}: ${error}`);
            }
          }

          // Handle deletions
          for (const existingRecord of existingRecords) {
            const stillExists = records.some(r => (r.id || r.xata_id) === existingRecord.xata_id);
            if (!stillExists) {
              try {
                await ctx.db.delete(existingRecord._id);
                syncStats.recordsDeleted++;
              } catch (error) {
                syncStats.errors.push(`Error deleting record in ${tableName}: ${error}`);
              }
            }
          }

          syncStats.tablesProcessed++;
        } catch (error) {
          syncStats.errors.push(`Error processing table ${tableName}: ${error}`);
        }
      }

      // 5. Clean up exports
      await executeCommand(`rm -rf ${exportDir}/*`);
      
      // Send success notification
      await ctx.scheduler.runAfter(0, internal.utils.notifications.sendDiscordNotification, {
        type: "success",
        title: "Xata to Convex Sync Completed",
        description: "Database synchronization completed successfully",
        details: {
          duration: `${Math.round((new Date().getTime() - new Date(syncStats.startTime).getTime()) / 1000)}s`,
          tablesProcessed: syncStats.tablesProcessed,
          recordsCreated: syncStats.recordsCreated,
          recordsUpdated: syncStats.recordsUpdated,
          recordsDeleted: syncStats.recordsDeleted,
          errors: syncStats.errors.length > 0 ? syncStats.errors : "None"
        }
      });

    } catch (error) {
      // Send error notification
      await ctx.scheduler.runAfter(0, internal.utils.notifications.sendDiscordNotification, {
        type: "error",
        title: "Xata to Convex Sync Failed",
        description: "Database synchronization encountered an error",
        details: {
          error: error.message,
          stats: syncStats
        }
      });
      throw error;
    }
  },
});

// Setup cron job to run twice daily
export const setupXataSyncCron = internalMutation({
  handler: async (ctx) => {
    const cronName = "xata-sync";
    const existingCron = await cronJobs.get(ctx, { name: cronName });
    
    if (!existingCron) {
      await cronJobs.register(
        ctx,
        {
          name: cronName,
          pattern: "0 0,12 * * *" // Run at 00:00 and 12:00
        },
        internal.syncXataToConvex.syncFromXata
      );
      
      // Send notification about cron job setup
      await ctx.scheduler.runAfter(0, internal.utils.notifications.sendDiscordNotification, {
        type: "success",
        title: "Xata Sync Cron Job Registered",
        description: "The sync cron job has been successfully registered",
        details: {
          schedule: "Twice daily (00:00 and 12:00)",
          name: cronName
        }
      });
    }
  },
});
