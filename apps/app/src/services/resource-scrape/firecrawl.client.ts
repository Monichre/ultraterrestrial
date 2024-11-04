import FirecrawlApp, {
  type CrawlParams,
  type CrawlStatusResponse,
} from '@mendable/firecrawl-js'
import type { version } from 'os'

export const fireCrawl = new FirecrawlApp( {
  apiKey: process.env.FIRECRAWL_API_KEY,
  version: "v0",
} )
