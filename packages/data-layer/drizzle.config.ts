import { env } from 'bun'
import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { DATABASE_URL } from './src/db/db.client'


// export default defineConfig( {

//   dbCredentials: {
//     url: DATABASE_URL
//   },} )
