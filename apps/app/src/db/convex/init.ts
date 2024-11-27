import { internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

// This function will be called during deployment to ensure the cron job is registered
export const init = internalMutation({
  handler: async (ctx) => {
    await internal.syncXataToConvex.setupXataSyncCron(ctx);
  },
});
