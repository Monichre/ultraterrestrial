// types.ts
import { inferDataTypes, findTemporalFields, findGeographicFields, findCategoricalFields, findNumericFields } from "@/app/helper"
import { generateConfig } from "@/app/visualization-config"
import { z } from "zod"

export type EntityType = 'event' | 'topic' | 'person' | 'organization' | 'testimony' | 'artifact'

export interface NetworkNode {
  id: string
  label: string
  type: EntityType
  size?: number
  score?: number
}

export interface NetworkLink {
  source: string
  target: string
  type: string
  weight?: number
}

export interface TimelineItem {
  id: string
  date: Date
  type: EntityType
  title: string
  description?: string
  relatedEntities: string[]
}

// Enhanced visualization config types
export const visualizationSchema = z.discriminatedUnion( 'type', [
  // Network Graph Config
  z.object( {
    type: z.literal( 'network' ),
    description: z.string(),
    entityTypes: z.array( z.enum( ['event', 'topic', 'person', 'organization', 'testimony', 'artifact'] ) ),
    relationshipTypes: z.array( z.string() ),
    nodeSize: z.enum( ['degree', 'authority', 'betweenness'] ).optional(),
    layout: z.enum( ['force', 'circular', 'hierarchical'] ),
    filters: z.array( z.string() ).optional(),
  } ),

  // Timeline Config
  z.object( {
    type: z.literal( 'timeline' ),
    description: z.string(),
    entityTypes: z.array( z.enum( ['event', 'testimony', 'artifact'] ) ),
    groupBy: z.enum( ['type', 'location', 'organization'] ).optional(),
    dateRange: z.object( {
      start: z.date().optional(),
      end: z.date().optional(),
    } ).optional(),
  } ),

  // Geographic Config
  z.object( {
    type: z.literal( 'geographic' ),
    description: z.string(),
    entityTypes: z.array( z.enum( ['event', 'sighting', 'organization'] ) ),
    clusterBy: z.enum( ['type', 'year', 'organization'] ).optional(),
    heatmap: z.boolean().optional(),
    timeRange: z.object( {
      start: z.date().optional(),
      end: z.date().optional(),
    } ).optional(),
  } ),

  // Enhanced Chart Config
  z.object( {
    type: z.literal( 'chart' ),
    description: z.string(),
    chartType: z.enum( ['bar', 'line', 'area', 'pie', 'scatter', 'radar'] ),
    xAxis: z.object( {
      key: z.string(),
      type: z.enum( ['category', 'time', 'linear'] ),
      label: z.string().optional(),
    } ),
    yAxis: z.object( {
      keys: z.array( z.string() ),
      type: z.enum( ['linear', 'log'] ).optional(),
      label: z.string().optional(),
    } ),
    groupBy: z.string().optional(),
    aggregation: z.enum( ['count', 'sum', 'average', 'median'] ).optional(),
    colors: z.record( z.string() ).optional(),
    legend: z.boolean().optional(),
  } )
] )

// analysis-utils.ts
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