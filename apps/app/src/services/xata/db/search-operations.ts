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
    rules: prompt ? [prompt] : [],
    searchType: 'keyword',
    search: {
      fuzziness: 0,
      prefix: 'phrase',
    }
  } )
  const fetchRecords = async ( recordIds: string[] ) => await Promise.all( recordIds.map( async ( recordId ) => await xata.db[table].read( recordId ) ) )

  if ( result?.answer ) {

    return {
      answer: result.answer,
      records: await fetchRecords( result.records )
    }
  }
  // TODO: handle the result
  // schema looks like this:
  /*
  const dbResponse = {
    answer: 'Based on the information provided in the context, some related data points or avenues worth exploring could include:\n' +
      '\n' +
      "1. Further investigation into the Pentagon's All-Domain Anomaly Resolution Office (AARO) and its findings on Unidentified Aerial Phenomena (UAPs), particularly regarding the scientific approach, unexplained cases, concerns about technological surprises, and ongoing investigations.\n" +
      '\n' +
      "2. Delving into Jim Semivan's perspective on UAPs shaped by his 25-year career in the CIA's National Clandestine Service, focusing on his emphasis on data collection and analysis, credibility and disclosure, and non-conventional thinking in UFO research.\n" +
      '\n' +
      "3. Exploring Robert Bigelow's involvement in UFO research, including his funding of projects, founding of the National Institute for Discovery Science (NIDS), ownership of Skinwalker Ranch, collaboration with the U.S. Department of Defense on advanced aerospace threats, and his interest in life after death research.\n" +
      '\n' +
      "These avenues can provide further insights into the individuals' roles, perspectives, and contributions to the field of UFO research and related phenomena.",
    sessionId: 'lg70uotkkp7cp74eqcejohvnqg',
    records: [
      'rec_cqkqmkvc12dbm3mecl60',
      'rec_cqff5k20hn8didc5u610',
      'rec_cobdfd4jmvif9dabl1h0'
    ]
  }
  */
  return result
}
