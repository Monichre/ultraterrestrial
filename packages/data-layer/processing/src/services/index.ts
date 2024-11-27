import { xata } from "./xata/client"

export const DB_SERVICE_URL_MAP = {
  xata: {
    client: xata,
    url: process.env.XATA_DATABASE_URL,
    apiKey: process.env.XATA_API_KEY,
  },
  supabase: {
    client: '',
    url: process.env.SUPABASE_DATABASE_URL,
  },
  neon: {
    client: '',
    url: process.env.NEON_DATABASE_URL,
  },
  pglite: {
    client: '',
    url: process.env.PGLITE_DATABASE_URL,
  },
}
