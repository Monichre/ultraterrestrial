// drizzle.config.ts
import { defineConfig } from "drizzle-kit"

export default defineConfig( {
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgres://default:JewnMy7dzi8N@ep-sweet-leaf-a57brh1u.us-east-2.aws.neon.tech:5432/verceldb?sslmode=require",

  },
} )
