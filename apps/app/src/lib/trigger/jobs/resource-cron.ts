
import { logger, schedules, task, wait } from "@trigger.dev/sdk/v3"

import { scrapeAndSummarizeAllExternalDisclosureResources } from "@/services/resource-scrape/resource-scrape"
import { style } from "d3"


// const resend = new Resend( process.env.RESEND_API_KEY )

// Parent task (scheduled to run 9AM every weekday)
export const runDailyResourceScrape = schedules.task( {
  id: "resource-scrape",
  cron: {
    pattern: "0 9 * * 1-5",
    timezone: "America/Chicago",
  }, // Run at 9 AM, Monday to Friday
  run: async () => {
    return await scrapeAndSummarizeAllExternalDisclosureResources()

  },
} )
