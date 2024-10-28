

import { type DatabaseClient, type SupportedClients } from '../types'

class DataLayer {
  private client: DatabaseClient

  constructor( clientType: SupportedClients ) {
    switch ( clientType ) {
      case 'supabase':
        this.client = new SupabaseAdapter()
        break
      case 'xata':
        this.client = new XataAdapter()
        break
      case 'neon':
        this.client = new NeonAdapter()
        break
      case 'pglite':
        this.client = new PGLiteAdapter()
        break
      default:
        throw new Error( `Unsupported client type: ${clientType}` )
    }
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.disconnect()
  }

  query<T>( query: string, params?: any[] ): Promise<T[]> {
    return this.client.query<T>( query, params )
  }

  mutate<T>( mutation: string, params?: any[] ): Promise<T> {
    return this.client.mutate<T>( mutation, params )
  }

  // Add other methods as needed
}

export default DataLayer; import type { query } from '@electric-sql/pglite/template'
import { connect } from 'bun'
