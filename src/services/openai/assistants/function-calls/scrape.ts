import { scrapeUfoDatabase } from "@/services/web-scraper"

( async () => {
  const data = await scrapeUfoDatabase()
  console.log( 'data: ', data )
} )()