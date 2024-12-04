
import { cronJobs } from "convex/server"
import { internal } from "./_generated/api"
import { internalMutation } from "./_generated/server"

// Helper function to execute shell commands
async function executeCommand( command: string ): Promise<{ success: boolean; output?: string; error?: any }> {
  try {
    // Instead of executing shell commands, we'll need to handle the operations directly
    if ( command.startsWith( 'mkdir' ) ) {
      // For mkdir operations, we can use Node's fs promises API
      const fs = require( 'fs/promises' )
      const path = command.split( ' ' ).pop()!
      await fs.mkdir( path, { recursive: true } )
      return { success: true }
    }

    if ( command.startsWith( 'python3' ) ) {
      // For Python script execution, we'll need to handle this differently
      // You may want to:
      // 1. Use a direct API call to Xata instead of Python script
      // 2. Move this logic to a separate service/endpoint
      // 3. Use Node-based alternatives for the functionality
      throw new Error( 'Python script execution not supported - please use direct API calls instead' )
    }

    return { success: false, error: 'Unsupported command' }
  } catch ( error: any ) {
    return { success: false, error: error.message }
  }
}

// Function to process CSV data
function parseCSV( csvContent: string ) {
  const lines = csvContent.trim().split( "\n" )
  if ( lines.length < 2 ) return { headers: [], records: [] }

  const headers = lines[0].split( "," ).map( h => h.trim() )
  const records = lines.slice( 1 ).map( line => {
    const values = line.split( "," ).map( v => v.trim() )
    return headers.reduce( ( obj: any, header, index ) => {
      let value = values[index]
      if ( value === "true" ) value = true
      else if ( value === "false" ) value = false
      else if ( !isNaN( Number( value ) ) && value !== "" ) value = Number( value )
      obj[header] = value
      return obj
    }, {} )
  } )

  return { headers, records }
}

// Main sync function
export const syncFromXata = internalMutation( {
  handler: async ( ctx ) => {
    console.log( "Starting Xata to Convex sync..." )
    const syncStats = {
      startTime: new Date().toISOString(),
      tablesProcessed: 0,
      recordsCreated: 0,
      recordsUpdated: 0,
      recordsDeleted: 0,
      errors: [] as string[]
    }

    try {
      // Make request to export API endpoint
      const response = await fetch( 'http://localhost:3000/api/internal/export', {
        method: 'POST'
      } )

      if ( !response.ok ) {
        throw new Error( `Export API request failed: ${response.statusText}` )
      }

      const { success, data, error } = await response.json()

      if ( !success || error ) {
        throw new Error( error || 'Export failed' )
      }

      // Process each table from the exported data
      for ( const [tableName, records] of Object.entries( data ) ) {
        console.log( `Processing table: ${tableName}` )

        try {
          // Get existing records for this table
          const existingRecords = await ctx.db.query( tableName as any ).collect()
          const existingIds = new Set( existingRecords.map( r => r.id ) )

          // Process each record
          for ( const record of records ) {
            const recordId = record.id
            if ( !recordId ) continue

            try {
              if ( existingIds.has( recordId ) ) {
                // Update existing record
                const existingRecord = existingRecords.find( r => r.id === recordId )
                if ( existingRecord ) {
                  await ctx.db.patch( existingRecord._id, record )
                  syncStats.recordsUpdated++
                }
              } else {
                // Insert new record
                await ctx.db.insert( tableName as any, record )
                syncStats.recordsCreated++
              }
            } catch ( error ) {
              syncStats.errors.push( `Error processing record in ${tableName}: ${error}` )
            }
          }

          // Handle deletions
          for ( const existingRecord of existingRecords ) {
            const stillExists = records.some( r => r.id === existingRecord.id )
            if ( !stillExists ) {
              try {
                await ctx.db.delete( existingRecord._id )
                syncStats.recordsDeleted++
              } catch ( error ) {
                syncStats.errors.push( `Error deleting record in ${tableName}: ${error}` )
              }
            }
          }

          syncStats.tablesProcessed++
        } catch ( error ) {
          syncStats.errors.push( `Error processing table ${tableName}: ${error}` )
        }
      }

      // Send success notification
      await ctx.scheduler.runAfter( 0, internal.utils.notifications.sendDiscordNotification, {
        type: "success",
        title: "Xata to Convex Sync Completed",
        description: "Database synchronization completed successfully",
        details: {
          duration: `${Math.round( ( new Date().getTime() - new Date( syncStats.startTime ).getTime() ) / 1000 )}s`,
          tablesProcessed: syncStats.tablesProcessed,
          recordsCreated: syncStats.recordsCreated,
          recordsUpdated: syncStats.recordsUpdated,
          recordsDeleted: syncStats.recordsDeleted,
          errors: syncStats.errors.length > 0 ? syncStats.errors : "None"
        }
      } )

    } catch ( error: any ) {
      // Send error notification
      await ctx.scheduler.runAfter( 0, internal.utils.notifications.sendDiscordNotification, {
        type: "error",
        title: "Xata to Convex Sync Failed",
        description: "Database synchronization encountered an error",
        details: {
          error: error.message,
          stats: syncStats
        }
      } )
      throw error
    }
  },
} )

// Setup cron job to run twice daily
export const setupXataSyncCron = internalMutation( {
  handler: async ( ctx ) => {
    const cronName = "xata-sync"
    const existingCron = await cronJobs.get( ctx, { name: cronName } )

    if ( !existingCron ) {
      await cronJobs.register(
        ctx,
        {
          name: cronName,
          pattern: "0 0,12 * * *" // Run at 00:00 and 12:00
        },
        internal.syncXataToConvex.syncFromXata
      )

      // Send notification about cron job setup
      await ctx.scheduler.runAfter( 0, internal.utils.notifications.sendDiscordNotification, {
        type: "success",
        title: "Xata Sync Cron Job Registered",
        description: "The sync cron job has been successfully registered",
        details: {
          schedule: "Twice daily (00:00 and 12:00)",
          name: cronName
        }
      } )
    }
  },
} )
