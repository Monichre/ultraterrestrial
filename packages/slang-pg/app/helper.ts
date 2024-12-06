// lib/data-analysis.ts

import type { EntityType } from "@/app/types"
import { generateConfig } from "@/app/visualization-config"

// Type definitions for field analysis
export type DataType = 'temporal' | 'geographic' | 'numeric' | 'categorical' | 'text'
export type FieldMetadata = {
  type: DataType
  format?: string
  unique?: number
  nullCount?: number
}

export function inferDataTypes( data: any[] ): Map<string, DataType> {
  if ( !data.length ) return new Map()

  const sample = data[0]
  const types = new Map<string, DataType>()

  Object.keys( sample ).forEach( field => {
    // Get all non-null values for the field
    const values = data.map( row => row[field] ).filter( val => val != null )
    if ( !values.length ) {
      types.set( field, 'text' )
      return
    }

    // Check if all values are dates
    if ( values.every( val => !isNaN( Date.parse( val ) ) ) ) {
      types.set( field, 'temporal' )
      return
    }

    // Check if field name suggests geographic data
    if ( field.toLowerCase().includes( 'lat' ) ||
      field.toLowerCase().includes( 'lon' ) ||
      field.toLowerCase().includes( 'location' ) ||
      field.toLowerCase().includes( 'country' ) ||
      field.toLowerCase().includes( 'city' ) ) {
      types.set( field, 'geographic' )
      return
    }

    // Check if all values are numbers
    if ( values.every( val => !isNaN( Number( val ) ) ) ) {
      types.set( field, 'numeric' )
      return
    }

    // Check if field has low cardinality relative to dataset size
    const uniqueValues = new Set( values )
    if ( uniqueValues.size < Math.min( data.length * 0.1, 20 ) ) {
      types.set( field, 'categorical' )
      return
    }

    // Default to text
    types.set( field, 'text' )
  } )

  return types
}

export function findTemporalFields( data: any[] ): string[] {
  const dataTypes = inferDataTypes( data )
  return Array.from( dataTypes.entries() )
    .filter( ( [_, type] ) => type === 'temporal' )
    .map( ( [field, _] ) => field )
}

export function findGeographicFields( data: any[] ): string[] {
  const dataTypes = inferDataTypes( data )
  return Array.from( dataTypes.entries() )
    .filter( ( [_, type] ) => type === 'geographic' )
    .map( ( [field, _] ) => field )
}

export function findCategoricalFields( data: any[] ): string[] {
  const dataTypes = inferDataTypes( data )
  return Array.from( dataTypes.entries() )
    .filter( ( [_, type] ) => type === 'categorical' )
    .map( ( [field, _] ) => field )
}

export function findNumericFields( data: any[] ): string[] {
  const dataTypes = inferDataTypes( data )
  return Array.from( dataTypes.entries() )
    .filter( ( [_, type] ) => type === 'numeric' )
    .map( ( [field, _] ) => field )
}

// Advanced analysis utilities
export function analyzeFieldDistribution( data: any[], field: string ): FieldMetadata {
  const values = data.map( row => row[field] ).filter( val => val != null )
  const uniqueValues = new Set( values )

  return {
    type: inferDataTypes( data ).get( field ) || 'text',
    unique: uniqueValues.size,
    nullCount: data.length - values.length,
  }
}

export function detectDateFormat( dateStr: string ): string | null {
  const formats = [
    { regex: /^\d{4}-\d{2}-\d{2}$/, format: 'YYYY-MM-DD' },
    { regex: /^\d{4}\/\d{2}\/\d{2}$/, format: 'YYYY/MM/DD' },
    { regex: /^\d{2}-\d{2}-\d{4}$/, format: 'DD-MM-YYYY' },
    { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: 'DD/MM/YYYY' },
    { regex: /^\d{4}$/, format: 'YYYY' },
    { regex: /^\d{4}-\d{2}$/, format: 'YYYY-MM' },
  ]

  for ( const { regex, format } of formats ) {
    if ( regex.test( dateStr ) ) return format
  }

  return null
}

export function inferTimeGranularity( dates: Date[] ): 'year' | 'month' | 'day' | 'hour' {
  if ( !dates.length ) return 'day'

  const differences = dates
    .slice( 1 )
    .map( ( date, i ) => date.getTime() - dates[i].getTime() )

  const minDiff = Math.min( ...differences )

  if ( minDiff < 24 * 60 * 60 * 1000 ) return 'hour'
  if ( minDiff < 31 * 24 * 60 * 60 * 1000 ) return 'day'
  if ( minDiff < 365 * 24 * 60 * 60 * 1000 ) return 'month'
  return 'year'
}

export function suggestAggregation( data: any[], field: string ): string {
  const metadata = analyzeFieldDistribution( data, field )

  if ( metadata.type === 'numeric' ) {
    // For numeric fields, suggest sum for low cardinality, average otherwise
    return metadata.unique! < data.length * 0.1 ? 'sum' : 'average'
  }

  // For categorical fields, always suggest count
  return 'count'
}

// Helper for detecting correlations between numeric fields
export function findCorrelations(
  data: any[],
  fields: string[]
): Map<string, Map<string, number>> {
  const correlations = new Map<string, Map<string, number>>()

  fields.forEach( field1 => {
    correlations.set( field1, new Map<string, number>() )

    fields.forEach( field2 => {
      if ( field1 === field2 ) return

      const values1 = data.map( row => Number( row[field1] ) )
      const values2 = data.map( row => Number( row[field2] ) )

      const correlation = calculateCorrelation( values1, values2 )
      correlations.get( field1 )!.set( field2, correlation )
    } )
  } )

  return correlations
}

function calculateCorrelation( x: number[], y: number[] ): number {
  const n = x.length
  const sumX = x.reduce( ( a, b ) => a + b, 0 )
  const sumY = y.reduce( ( a, b ) => a + b, 0 )
  const sumXY = x.reduce( ( sum, xi, i ) => sum + xi * y[i], 0 )
  const sumX2 = x.reduce( ( sum, xi ) => sum + xi * xi, 0 )
  const sumY2 = y.reduce( ( sum, yi ) => sum + yi * yi, 0 )

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt( ( n * sumX2 - sumX * sumX ) * ( n * sumY2 - sumY * sumY ) )

  return denominator === 0 ? 0 : numerator / denominator
}


export async function generateVisualizationConfig(
  data: any[],
  userQuery: string,
  tableName: string,
  relationships: Map<string, string[]>
) {
  try {
    // Analyze data structure and relationships
    const dataTypes = inferDataTypes( data )
    const temporalFields = findTemporalFields( data )
    const geographicFields = findGeographicFields( data )
    const categoricalFields = findCategoricalFields( data )
    const numericFields = findNumericFields( data )

    // Determine best visualization type based on data characteristics
    let visualizationType = determineVisualizationType( {
      dataTypes,
      temporalFields,
      geographicFields,
      relationships,
      userQuery
    } )

    // Generate appropriate config based on visualization type
    const config = await generateConfig(
      visualizationType,
      data,
      dataTypes,
      relationships
    )

    return config
  } catch ( error ) {
    console.error( 'Error generating visualization config:', error )
    throw new Error( 'Failed to generate visualization configuration' )
  }
}

// sql-query-builder.ts
export function buildNetworkQuery(
  entityTypes: EntityType[],
  relationshipTypes: string[],
  filters?: Record<string, any>
): string {
  // Build CTE for each entity type
  const entityQueries = entityTypes.map( type => `
    ${type}_nodes AS (
      SELECT 
        id::text as id,
        name as label,
        '${type}' as type,
        COALESCE(authority, 0) as score
      FROM ${type}s
      ${filters?.[type] ? `WHERE ${filters[type]}` : ''}
    )`
  )

  // Build relationship queries
  const relationshipQueries = relationshipTypes.map( type => {
    const [sourceType, targetType] = type.split( '_' )
    return `
      ${type}_edges AS (
        SELECT 
          ${sourceType}_id::text as source,
          ${targetType}_id::text as target,
          '${type}' as type
        FROM ${type}
      )
    `
  } )

  // Combine everything
  return `
    WITH ${entityQueries.join( ',' )},
         ${relationshipQueries.join( ',' )}
    
    SELECT id, label, type, score
    FROM (${entityTypes.map( t => `SELECT * FROM ${t}_nodes` ).join( ' UNION ALL ' )}) nodes
    UNION ALL
    SELECT source, target, type, 1 as score
    FROM (${relationshipTypes.map( r => `SELECT * FROM ${r}_edges` ).join( ' UNION ALL ' )}) edges
  `
}

// visualization-helpers.ts
export function determineVisualizationType( params: {
  dataTypes: Map<string, string>,
  temporalFields: string[],
  geographicFields: string[],
  relationships: Map<string, string[]>,
  userQuery: string
} ): string {
  const {
    dataTypes,
    temporalFields,
    geographicFields,
    relationships,
    userQuery
  } = params

  // Check for network analysis keywords
  if ( userQuery.toLowerCase().includes( 'connection' ) ||
    userQuery.toLowerCase().includes( 'relationship' ) ||
    relationships.size > 0 ) {
    return 'network'
  }

  // Check for temporal analysis
  if ( temporalFields.length > 0 &&
    ( userQuery.toLowerCase().includes( 'when' ) ||
      userQuery.toLowerCase().includes( 'time' ) ||
      userQuery.toLowerCase().includes( 'trend' ) ) ) {
    return 'timeline'
  }

  // Check for geographic analysis
  if ( geographicFields.length > 0 &&
    ( userQuery.toLowerCase().includes( 'where' ) ||
      userQuery.toLowerCase().includes( 'location' ) ) ) {
    return 'geographic'
  }

  // Default to standard chart
  return 'chart'
}