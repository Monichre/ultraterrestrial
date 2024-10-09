import { xata } from '@/services/xata/client'
import {
  connectionMapByEntityType,
  objectMapPlural,
  objectMapToSingular,
} from '@/utils'



export const executePlatformWideConnectionSearch = async ( { id, type }: any ) => {
  const tables: any = connectionMapByEntityType[type]
  const originalRecordTypeSingular = objectMapToSingular[type]

  const { totalCount, records } = await xata.search.all( `${id}`, {
    tables: tables.map(
      ( { table, target }: { table: string; target: string } ) => {
        return {
          table: `${table}`,
          target: [{ column: `${target}`, weight: 10 }],
        }
      }
    ),
    fuzziness: 0,
    prefix: 'phrase',
  } )

  const connectionRecords: Set<any> = new Set()

  for ( const item of records ) {
    const {
      record: { xata: xataObject, ...restOfRecord },
      table: connectionTable,
    }: any = item

    if (
      restOfRecord[originalRecordTypeSingular] &&
      restOfRecord[originalRecordTypeSingular].id === id
    ) {
      delete restOfRecord[originalRecordTypeSingular]
    }
    const { id: recordId, ...rest } = restOfRecord

    const [connectionType] = Object.keys( rest )

    const table: any = objectMapPlural[connectionType]

    const connectedRecordId = rest[connectionType].id

    const connection: any = await xata.db[table].read( connectedRecordId )

    if ( !connectionRecords.has( connection ) ) {
      connectionRecords.add( {
        ...connection,
        type: table,
        connectionTableId: recordId,
        connectionTable,
      } )
    }
  }
  return connectionRecords
}

export const targetsPerTable: any = {
  events: [
    { column: 'name', weight: 5 },
    { column: 'date', weight: 3 },
    { column: 'location', weight: 2 },
    { column: 'description', weight: 1 },

  ],
  personnel: [
    { column: 'role', weight: 2 },
    { column: 'bio', weight: 3 },
    { column: 'name', weight: 5 },

  ],
  topics: [
    { column: 'name', weight: 5 },
    { column: 'summary', weight: 3 },

  ],
  testimonies: [
    { column: 'claim', weight: 5 },
    { column: 'summary', weight: 3 },
    { column: 'documentation', weight: 2 },

  ],
}
const valueBoosters = {
  events: ['name', 'date', 'location', 'description'],
  personnel: ( { column, value }: { column: string, value: string } ) => [{ valueBooster: { column, value, factor: 5 } }],
  topics: ['name', 'summary'],
  testimonies: ['claim', 'summary', 'documentation'],
}

const processResults = ( records: any ) => {

  const results = records.map( ( record: any ) => {
    const { xata: searchRank, ...rest } = record
    const { highlight, score, table } = searchRank

    return {
      highlight,
      score,
      record: {
        ...rest,
        type: table,
      }
    }
  } )

  const [suggestedSearchResult, ...rest] = results
  return {
    suggestedSearchResult,
    relatedResults: rest
  }
}
export const executeDatabaseTableQuery = async ( { keyword, table }: any ) => {
  const target: any = targetsPerTable[table] || []


  const { records, totalCount } = await xata.db[table].search( keyword, {
    target,
    fuzziness: 0,
    prefix: 'phrase',
  } )

  return { ...processResults( records ), totalCount }
}

export const askXataWithAi = async ( { question, prompt, table }: any ) => {
  const result = await xata.db[table].ask( question, {
    rules: prompt,
    searchType: 'keyword',
    search: {
      fuzziness: 0,
      prefix: 'phrase',
    }
  } )
  return result
}
