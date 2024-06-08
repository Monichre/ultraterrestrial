#!/usr/bin/env ts-node

import { writeLogToFile } from '@/utils/write-log'

const {
  getEntityNetworkGraphData,
} = require('../lib/xata/get-entity-network-graph-data')

async function main() {
  try {
    const result = await getEntityNetworkGraphData()
    console.log(result)
    const { graphData } = result
    await writeLogToFile(graphData, 'graph-data.json')
  } catch (error) {
    console.error('Error executing getEntityNetworkGraphData:', error)
  }
}

main()
