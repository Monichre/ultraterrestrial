import { DB_SERVICE_URL_MAP } from "../services"

const ENV_SERVICE = 'xata'
export const DATABASE_URL = DB_SERVICE_URL_MAP[ENV_SERVICE].url

