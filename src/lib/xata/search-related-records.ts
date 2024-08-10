'use server'

import { getXataClient } from '../xata'
const xata: any = getXataClient()
import {
  connectionMapByEntityType,
  objectMapToSingular,
  objectMapPlural,
} from '@/utils'

export const searchRelatedRecords = async ({ id, type }: any) => {
  const tables: any = connectionMapByEntityType[type]
  const originalRecordTypeSingular = objectMapToSingular[type]

  const { totalCount, records } = await xata.search.all(`${id}`, {
    tables: tables.map(
      ({ table, target }: { table: string; target: string }) => {
        return {
          table: `${table}`,
          target: [{ column: `${target}`, weight: 10 }],
        }
      }
    ),
    fuzziness: 0,
    prefix: 'phrase',
  })

  const connectionRecords: Set<any> = new Set()

  for (const item of records) {
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

    const [connectionType] = Object.keys(rest)

    const table: any = objectMapPlural[connectionType]

    const connectedRecordId = rest[connectionType].id

    const connection: any = await xata.db[table].read(connectedRecordId)

    if (!connectionRecords.has(connection)) {
      connectionRecords.add({
        ...connection,
        type: table,
        connectionTableId: recordId,
        connectionTable,
      })
    }
  }
  return connectionRecords
}
