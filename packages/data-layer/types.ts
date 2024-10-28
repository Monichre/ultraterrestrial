import type { query } from "@electric-sql/pglite/template"
import type { connect } from "bun"

export interface DatabaseClient {
  connect(): Promise<void>
  disconnect(): Promise<void>
  query<T>( query: string, params?: any[] ): Promise<T[]>
  mutate<T>( mutation: string, params?: any[] ): Promise<T>
  // Add other necessary methods
}

export type SupportedClients = 'supabase' | 'xata' | 'neon' | 'pglite'
