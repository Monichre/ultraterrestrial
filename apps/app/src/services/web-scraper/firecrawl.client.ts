import FirecrawlApp, {
  type CrawlParams,
  type CrawlStatusResponse,
} from '@mendable/firecrawl-js'

export const webCrawler = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
})
