
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
import { inferDataTypes, findTemporalFields, findGeographicFields, findCategoricalFields, findNumericFields } from "@/app/helper"
import { determinePrimaryFocus, extractEntityTypes, hasTemporalComponent, hasGeographicComponent, hasRelationshipComponent, inferRelationships } from "@/app/query-analysis"
import { addAggregations, inferMainTable } from "@/app/query-utils"
import { generateConfig } from "@/app/visualization-config"
import { sql } from "@vercel/postgres"
// types.ts
import { z } from "zod"

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

const COMMON_PATTERNS = {
  TEMPORAL: {
    YEAR: "EXTRACT(YEAR FROM date)",
    MONTH: "TO_CHAR(date, 'YYYY-MM')",
    QUARTER: "TO_CHAR(date, 'YYYY-Q')"
  },
  GEOGRAPHIC: {
    COORDINATES: "ST_MakePoint(longitude, latitude)",
    DISTANCE: "ST_Distance",
    CLUSTER: "ST_ClusterDBSCAN"
  },
  NETWORK: {
    DEGREE: `
      WITH RECURSIVE connections AS (
        SELECT id, 1 as depth
        FROM key_figures
        WHERE id = $1
        UNION
        SELECT e.subject_matter_expert_id, c.depth + 1
        FROM event_subject_matter_experts e
        JOIN connections c ON c.id = e.event_id
        WHERE c.depth < 3
      )
      SELECT COUNT(DISTINCT id) as connection_count
      FROM connections
    `
  }
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
export async function analyzeQueryIntent( input: string ) {
  // Analyze the natural language query
  return {
    focus: determinePrimaryFocus( input ),
    entityTypes: extractEntityTypes( input ),
    temporal: hasTemporalComponent( input ),
    geographic: hasGeographicComponent( input ),
    relationships: hasRelationshipComponent( input )
  }
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


// Enhanced visualization config types




export async function generateEnhancedQuery(
  input: string,
  context: {
    tableSchema: any,
    relationships: Map<string, string[]>
  }
) {
  try {
    // Analyze input query to determine intent
    const queryIntent = await analyzeQueryIntent( input )

    // Generate base query based on intent
    let baseQuery = generateBaseQuery( queryIntent, context.tableSchema )

    // Add special handling based on query type
    switch ( queryIntent.type ) {
      case 'network':
        baseQuery = addNetworkAnalysis( baseQuery, queryIntent.entities )
        break
      case 'temporal':
        baseQuery = addTemporalAnalysis( baseQuery, queryIntent.timeframe )
        break
      case 'geographic':
        baseQuery = addGeographicAnalysis( baseQuery, queryIntent.location )
        break
      case 'comparative':
        baseQuery = addComparativeAnalysis( baseQuery, queryIntent.metrics )
        break
    }

    // Add appropriate aggregations and groupings
    baseQuery = addAggregations( baseQuery, queryIntent )

    return baseQuery
  } catch ( error ) {
    console.error( 'Error generating query:', error )
    throw new Error( 'Failed to generate query' )
  }
}

function addNetworkAnalysis( query: string, entities: string[] ): string {
  return `
    WITH RECURSIVE entity_network AS (
      -- Base network from key_figures
      SELECT 
        kf.id,
        kf.name,
        kf.authority,
        array[kf.id] as path,
        1 as depth
      FROM key_figures kf
      WHERE kf.id IN (${entities.join( ',' )})
      
      UNION ALL
      
      -- Recursive part connecting through various relationships
      SELECT 
        DISTINCT ON (connected_entity.id)
        connected_entity.id,
        connected_entity.name,
        connected_entity.authority,
        en.path || connected_entity.id,
        en.depth + 1
      FROM entity_network en
      -- Join to various connection tables
      LEFT JOIN event_subject_matter_experts esme ON en.id = esme.subject_matter_expert_id
      LEFT JOIN topic_subject_matter_experts tsme ON en.id = tsme.subject_matter_expert_id
      LEFT JOIN organization_members om ON en.id = om.member_id
      -- Join back to key_figures for the connected entities
      JOIN key_figures connected_entity ON 
        connected_entity.id = esme.event_id OR
        connected_entity.id = tsme.topic_id OR
        connected_entity.id = om.organization_id
      WHERE 
        en.depth < 3 AND
        NOT connected_entity.id = ANY(en.path)
    )
    SELECT 
      id,
      name,
      authority,
      array_length(path, 1) as connection_depth,
      depth as network_level
    FROM entity_network
    ORDER BY depth, authority DESC
  `
}

function addTemporalAnalysis( query: string, timeframe: string ): string {
  const timeExpr = COMMON_PATTERNS.TEMPORAL[timeframe.toUpperCase()] || COMMON_PATTERNS.TEMPORAL.MONTH
  return query.replace(
    /SELECT/i,
    `SELECT ${timeExpr} as time_period,`
  )
}

function addGeographicAnalysis( query: string, location: any ): string {
  return `
    WITH geo_data AS (
      ${query}
    )
    SELECT 
      *,
      ${COMMON_PATTERNS.GEOGRAPHIC.COORDINATES} as coords,
      ${COMMON_PATTERNS.GEOGRAPHIC.CLUSTER} OVER (
        PARTITION BY type 
        ORDER BY latitude, longitude
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
      ) as cluster_id
    FROM geo_data
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL
  `
}

export function addComparativeAnalysis( query: string, metrics: string[] ): string {
  const metricCalculations = metrics.map( metric => {
    switch ( metric ) {
      case 'authority':
        return 'AVG(authority) as avg_authority'
      case 'credibility':
        return 'AVG(credibility) as avg_credibility'
      case 'connections':
        return `(${COMMON_PATTERNS.NETWORK.DEGREE}) as connection_count`
      default:
        return `COUNT(DISTINCT ${metric}) as ${metric}_count`
    }
  } ).join( ',\n' )

  return query.replace( /SELECT.*FROM/is, `SELECT ${metricCalculations} FROM` )
}

export async function runEnhancedQuery( query: string ) {

  console.log( "🚀 ~ file: query-generator.ts:425 ~ runEnhancedQuery ~ query:", query )

  try {
    // Validate query

    if ( query && !query.toLowerCase().trim().startsWith( 'select' ) ) {
      throw new Error( 'Only SELECT queries are allowed' )
    }

    // Execute query
    const result = await sql.query( query )

    // Analyze results for visualization
    const visualizationConfig = await generateVisualizationConfig(
      result.rows,
      query,
      inferMainTable( query ),
      inferRelationships( query )
    )

    return {
      data: result.rows,
      visualization: visualizationConfig
    }
  } catch ( error ) {
    console.error( 'Error executing query:', error )
    throw new Error( 'Query execution failed' )
  }
}