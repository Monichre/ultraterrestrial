import { webCrawler } from '@/services/web-scraper/firecrawl.client'
import { EXTERNAL_RESOURCES } from '@/utils'

export const scrapeAllExternalDisclosureResources = async () => {
  const fullResourceScrape = await Promise.all(
    EXTERNAL_RESOURCES.map(async (resource) => {
      const scrapeResponse = await webCrawler.scrapeUrl(resource, {
        formats: ['markdown', 'html'],
      })
      return {
        source: resource,
        data: scrapeResponse,
      }
    })
  )
  console.log('fullResourceScrape: ', fullResourceScrape)
  return fullResourceScrape
}

export const crawlAllExternalDisclosureResources = async () => {
  const fullResourceCrawl = await Promise.all(
    EXTERNAL_RESOURCES.map(async (resource) => {
      const crawlResponse = await webCrawler.crawlUrl(resource, {
        limit: 100,
        scrapeOptions: {
          formats: ['markdown', 'html'],
        },
      })
      return {
        source: resource,
        data: crawlResponse,
      }
    })
  )
  console.log('fullResourceCrawl: ', fullResourceCrawl)
  return fullResourceCrawl
}
