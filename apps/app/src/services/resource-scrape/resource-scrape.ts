// import { summarize } from "@/lib/anthropic/client"
import { summarize } from "@/services/agents/disclosure/functions/summarize"
import { scrapeWithJina, scrapeWithFireCrawl } from "@/services/resource-scrape"
import { EXTERNAL_RESOURCES } from "@/utils"
import { YOUTUBE_RESOURCES } from "@/utils"

export const scrapeAndSummarizeAllExternalDisclosureResources = async () => {
  const results = await Promise.all( EXTERNAL_RESOURCES.map( async ( resource ) => {
    const jinaResponse = await scrapeWithJina( resource )

    console.log( "🚀 ~ file: resource-cron.ts:23 ~ results ~ jinaResponse:", jinaResponse )

    const fireCrawlResponse = await scrapeWithFireCrawl( resource )

    console.log( "🚀 ~ file: resource-cron.ts:27 ~ results ~ fireCrawlResponse:", fireCrawlResponse )



    return { jinaResponse, fireCrawlResponse }
  } ) )

  const summaries = await Promise.all( results.map( async ( result ) => {


    const aiResponse = await summarize( result )

    console.log( "🚀 ~ file: resource-cron.ts:31 ~ summaries ~ aiResponse:", aiResponse )

  } ) )
  console.log( "🚀 ~ file: resource-cron.ts:30 ~ summaries ~ summaries:", summaries )
  return summaries

}