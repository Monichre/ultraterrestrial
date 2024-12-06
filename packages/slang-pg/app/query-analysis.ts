// lib/query-analysis.ts

// Define types for entity analysis
import { findTemporalFields, findGeographicFields, findNumericFields } from '@/app/helper'
import { generateConfig } from '@/app/visualization-config'
// lib/query-analysis.ts
import { determineVisualizationType } from './types'

export type QueryFocus = 'comparison' | 'trend' | 'distribution' | 'relationship' | 'location' | 'detail'
export type EntityType = 'event' | 'person' | 'organization' | 'topic' | 'testimony' | 'artifact'


export async function analyzeResults(
  results: any[],
  query: string
): Promise<{
  visualizationType: string
  config: Awaited<ReturnType<typeof generateConfig>>
  insights: string[]
}> {
  try {
    // Analyze query structure
    const relationships = inferRelationships( query )

    // Analyze result data characteristics
    const dataCharacteristics = {
      rowCount: results.length,
      columns: Object.keys( results[0] || {} ),
      temporalFields: findTemporalFields( results ),
      geographicFields: findGeographicFields( results ),
      numericFields: findNumericFields( results ),
      hasRelationships: relationships.size > 0
    }

    // Determine visualization type
    const visualizationType = determineVisualizationType( {
      dataTypes: new Map(),  // This would come from your data analysis
      temporalFields: dataCharacteristics.temporalFields,
      geographicFields: dataCharacteristics.geographicFields,
      relationships,
      userQuery: query
    } )

    // Generate insights
    const insights = generateInsights( results, dataCharacteristics )

    // Generate appropriate configuration
    const config = await generateConfig(
      visualizationType,
      results,
      new Map(),  // This would come from your data analysis
      relationships
    )

    return {
      visualizationType,
      config,
      insights
    }
  } catch ( error ) {
    console.error( 'Error analyzing results:', error )
    throw new Error( 'Failed to analyze query results' )
  }
}

export function handleQueryError( error: any ): never {
  // Classify error type
  if ( error.message.includes( 'relation' ) && error.message.includes( 'does not exist' ) ) {
    throw new Error( 'Table or view not found in database' )
  }

  if ( error.message.includes( 'permission denied' ) ) {
    throw new Error( 'Insufficient permissions to access data' )
  }

  if ( error.message.includes( 'syntax error' ) ) {
    throw new Error( 'Invalid SQL query syntax' )
  }

  if ( error.message === 'Query timeout' ) {
    throw new Error( 'Query execution timed out - please simplify your request' )
  }

  // Log detailed error for debugging
  console.error( 'Database query error:', {
    message: error.message,
    code: error.code,
    detail: error.detail,
    hint: error.hint,
    position: error.position
  } )

  throw new Error( 'An error occurred while executing the query' )
}

export function inferRelationships( query: string ): Map<string, string[]> {
  const relationships = new Map<string, string[]>()

  // Common join patterns to detect relationships
  const joinPatterns = [
    {
      regex: /JOIN\s+(\w+)\s+ON\s+(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/gi,
      extract: ( match: RegExpMatchArray ) => ( {
        table1: match[1],
        table2: match[4],
        key1: match[3],
        key2: match[5]
      } )
    },
    {
      regex: /FROM\s+(\w+)\s*,\s*(\w+)\s+WHERE\s+(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/gi,
      extract: ( match: RegExpMatchArray ) => ( {
        table1: match[1],
        table2: match[2],
        key1: match[4],
        key2: match[6]
      } )
    }
  ]

  // Process each join pattern
  joinPatterns.forEach( pattern => {
    const matches = Array.from( query.matchAll( pattern.regex ) )
    matches.forEach( match => {
      const { table1, table2 } = pattern.extract( match )

      // Add bidirectional relationships
      if ( !relationships.has( table1 ) ) {
        relationships.set( table1, [] )
      }
      if ( !relationships.has( table2 ) ) {
        relationships.set( table2, [] )
      }

      relationships.get( table1 )!.push( table2 )
      relationships.get( table2 )!.push( table1 )
    } )
  } )

  return relationships
}

function generateInsights( results: any[], characteristics: any ): string[] {
  const insights: string[] = []

  // Data volume insights
  if ( results.length > 1000 ) {
    insights.push( `Large dataset detected (${results.length} rows)` )
  }

  // Temporal patterns
  if ( characteristics.temporalFields.length > 0 ) {
    insights.push( 'Time-based patterns available for analysis' )
  }

  // Geographic distribution
  if ( characteristics.geographicFields.length > 0 ) {
    insights.push( 'Geographic distribution analysis possible' )
  }

  // Relationship complexity
  if ( characteristics.hasRelationships ) {
    insights.push( 'Network relationships detected' )
  }

  return insights
}

const QUERY_PATTERNS = {
  TEMPORAL: [
    'when', 'date', 'year', 'month', 'time', 'period', 'during',
    'before', 'after', 'between', 'since', 'until', 'timeline',
    'history', 'trend', 'evolution', 'over time'
  ],

  GEOGRAPHIC: [
    'where', 'location', 'place', 'country', 'city', 'region',
    'area', 'near', 'around', 'coordinates', 'map', 'geographic'
  ],

  RELATIONSHIP: [
    'connection', 'relationship', 'between', 'link', 'related',
    'connected', 'involved', 'associated', 'network', 'interaction'
  ],

  COMPARISON: [
    'compare', 'difference', 'similar', 'versus', 'vs',
    'more', 'less', 'than', 'most', 'least', 'highest', 'lowest'
  ],

  ENTITY_MARKERS: {
    event: ['incident', 'sighting', 'occurrence', 'case', 'event'],
    person: ['expert', 'witness', 'person', 'investigator', 'researcher'],
    organization: ['organization', 'agency', 'group', 'institution', 'department'],
    topic: ['topic', 'subject', 'theme', 'category', 'field'],
    testimony: ['testimony', 'statement', 'account', 'report', 'claim'],
    artifact: ['artifact', 'evidence', 'document', 'photo', 'record']
  }
}

export function determinePrimaryFocus( input: string ): QueryFocus {
  const normalizedInput = input.toLowerCase()

  // Check for relationship focus
  if ( QUERY_PATTERNS.RELATIONSHIP.some( term => normalizedInput.includes( term ) ) ) {
    return 'relationship'
  }

  // Check for temporal trends
  if ( QUERY_PATTERNS.TEMPORAL.some( term => normalizedInput.includes( term ) ) &&
    normalizedInput.includes( 'trend' ) ) {
    return 'trend'
  }

  // Check for geographic focus
  if ( QUERY_PATTERNS.GEOGRAPHIC.some( term => normalizedInput.includes( term ) ) ) {
    return 'location'
  }

  // Check for comparisons
  if ( QUERY_PATTERNS.COMPARISON.some( term => normalizedInput.includes( term ) ) ) {
    return 'comparison'
  }

  // Check for distribution analysis
  if ( normalizedInput.includes( 'distribution' ) ||
    normalizedInput.includes( 'spread' ) ||
    normalizedInput.includes( 'pattern' ) ) {
    return 'distribution'
  }

  // Default to detail view
  return 'detail'
}

export function extractEntityTypes( input: string ): EntityType[] {
  const normalizedInput = input.toLowerCase()
  const entityTypes: EntityType[] = []

  // Check each entity type for relevant markers
  Object.entries( QUERY_PATTERNS.ENTITY_MARKERS ).forEach( ( [type, markers] ) => {
    if ( markers.some( marker => normalizedInput.includes( marker ) ) ) {
      entityTypes.push( type as EntityType )
    }
  } )

  // Add implied entities based on context
  if ( normalizedInput.includes( 'testimony' ) || normalizedInput.includes( 'witness' ) ) {
    if ( !entityTypes.includes( 'person' ) ) entityTypes.push( 'person' )
    if ( !entityTypes.includes( 'testimony' ) ) entityTypes.push( 'testimony' )
  }

  if ( normalizedInput.includes( 'investigation' ) ) {
    if ( !entityTypes.includes( 'event' ) ) entityTypes.push( 'event' )
    if ( !entityTypes.includes( 'organization' ) ) entityTypes.push( 'organization' )
  }

  // Return default if no entities detected
  return entityTypes.length ? entityTypes : ['event']
}

export function hasTemporalComponent( input: string ): boolean {
  const normalizedInput = input.toLowerCase()
  return QUERY_PATTERNS.TEMPORAL.some( term => normalizedInput.includes( term ) )
}

export function hasGeographicComponent( input: string ): boolean {
  const normalizedInput = input.toLowerCase()
  return QUERY_PATTERNS.GEOGRAPHIC.some( term => normalizedInput.includes( term ) )
}

export function hasRelationshipComponent( input: string ): boolean {
  const normalizedInput = input.toLowerCase()
  return QUERY_PATTERNS.RELATIONSHIP.some( term => normalizedInput.includes( term ) )
}

// Advanced intent analysis
export function analyzeQueryComplexity( input: string ): {
  complexity: 'simple' | 'moderate' | 'complex',
  components: string[]
} {
  const components: string[] = []
  let complexityScore = 0

  // Check for temporal complexity
  if ( hasTemporalComponent( input ) ) {
    components.push( 'temporal' )
    complexityScore += 1
  }

  // Check for geographic complexity
  if ( hasGeographicComponent( input ) ) {
    components.push( 'geographic' )
    complexityScore += 1
  }

  // Check for relationship complexity
  if ( hasRelationshipComponent( input ) ) {
    components.push( 'relationship' )
    complexityScore += 2
  }

  // Check for multiple entity types
  const entities = extractEntityTypes( input )
  if ( entities.length > 1 ) {
    components.push( 'multi-entity' )
    complexityScore += entities.length - 1
  }

  // Check for comparisons
  if ( QUERY_PATTERNS.COMPARISON.some( term => input.toLowerCase().includes( term ) ) ) {
    components.push( 'comparative' )
    complexityScore += 1
  }

  // Determine overall complexity
  return {
    complexity: complexityScore <= 1 ? 'simple' :
      complexityScore <= 3 ? 'moderate' : 'complex',
    components
  }
}

// Context extraction for more accurate entity resolution
export function extractQueryContext( input: string ): {
  timeframe?: string,
  location?: string,
  entityContext: Map<EntityType, string[]>
} {
  const normalizedInput = input.toLowerCase()
  const entityContext = new Map<EntityType, string[]>()

  // Extract time context
  const timeMatches = normalizedInput.match( /\b\d{4}s?\b|\b\d{4}-\d{4}\b/g )
  const timeframe = timeMatches ? timeMatches[0] : undefined

  // Extract location context
  const locationMatches = normalizedInput.match( /\b[A-Z][a-z]+(,\s*[A-Z][a-z]+)*\b/g )
  const location = locationMatches ? locationMatches[0] : undefined

  // Extract entity-specific context
  Object.entries( QUERY_PATTERNS.ENTITY_MARKERS ).forEach( ( [type, markers] ) => {
    const contextWords: string[] = []
    markers.forEach( marker => {
      const regex = new RegExp( `\\b\\w+\\s+${marker}\\b|\\b${marker}\\s+\\w+\\b`, 'gi' )
      const matches = normalizedInput.match( regex )
      if ( matches ) {
        contextWords.push( ...matches )
      }
    } )
    if ( contextWords.length ) {
      entityContext.set( type as EntityType, contextWords )
    }
  } )

  return {
    timeframe,
    location,
    entityContext
  }
}
