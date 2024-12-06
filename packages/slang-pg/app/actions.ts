"use server"

import { inferDataTypes, findTemporalFields, findGeographicFields } from "@/app/helper"
import { determinePrimaryFocus, extractEntityTypes, hasTemporalComponent, hasGeographicComponent, hasRelationshipComponent, analyzeResults, handleQueryError, inferRelationships } from "@/app/query-analysis"
import { determineVisualizationType, visualizationSchema } from "@/app/query-generator"
import { enhanceChartStyle, enhanceGeographicStyle, enhanceNetworkStyle, enhanceTimelineStyle } from "@/app/visualization-styles"
import { schemaString } from "@/lib/schema-string"
import { explanationsSchema } from "@/lib/types"

import { openai } from "@ai-sdk/openai"
import { sql } from "@vercel/postgres"
import { generateObject } from "ai"
import { z } from "zod"


const systemPrompt = `You are a SQL (postgres) and data visualization expert. Your job is to help the user write a SQL query to retrieve the data they need. The table schema is as follows:
${schemaString}

Core Tables: key_figures, events, topics, organizations, organization_members
Join Tables: topic_subject_matter_experts, event_subject_matter_experts, topics_testimonies, event_topic_subject_matter_experts
"subject_matter_expert" and "witness" always refer to the id of the key_figure table as a foreign relation.
Key figures are tied to topics, events, and testimonies through the related join tables.

Key Capabilities:
1. Network Analysis:
   - Can analyze relationships between entities
   - Supports degree centrality, authority scores, and connection patterns
   
2. Temporal Analysis:
   - Handles time-based queries with appropriate grouping (year, month, quarter) on the sightings and events tables
   - Supports trend analysis and temporal patterns
   
3. Geographic Analysis:
   - Processes location data from the sightings and events tables
   - Can process location-based queries with clustering
   - Supports coordinate-based analysis and regional patterns
   
4. Entity Analysis:
   - Calculates authority scores and credibility metrics
   - Supports comparative analysis across different entity types

5. Key Figures Rank and Authority Score:
   - Calculates authority scores and credibility metrics
   - Supports comparative analysis across different entity types

   

Query Requirements:
- Only retrieval queries are allowed
- Must return quantitative data suitable for visualization
- At least two columns in results
- Rates should be returned as decimals (e.g., 0.1 for 10%)
- UK/USA should be written as "United Kingdom"/"United States"
- Time-based queries default to yearly grouping

The response should consider the most appropriate visualization type:
- Network graphs for relationship queries
- Timelines for temporal data
- Geographic visualizations for location data
- Charts (bar, line, pie) for comparative data`

function isValidQuery( { query }: { query: string } ): boolean {

  console.log( "🚀 ~ file: actions.ts:52 ~ isValidQuery ~ query:", query )

  const normalized = query?.toLowerCase().trim()

  console.log( "🚀 ~ file: actions.ts:53 ~ isValidQuery ~ normalized:", normalized )


  // Security checks
  if ( !normalized.startsWith( "select" ) ) return false
  if ( normalized.includes( "drop" ) ) return false
  if ( normalized.includes( "delete" ) ) return false
  if ( normalized.includes( "insert" ) ) return false

  // Structure checks
  const hasValidFrom = /from\s+[\w\."]+(\s|$)/i.test( query )
  const hasBalancedParens = ( query.match( /\(/g ) || [] ).length ===
    ( query.match( /\)/g ) || [] ).length

  return hasValidFrom && hasBalancedParens
}

async function analyzeQueryIntent( input: string ) {
  // Analyze the natural language query
  return {
    focus: determinePrimaryFocus( input ),
    entityTypes: extractEntityTypes( input ),
    temporal: hasTemporalComponent( input ),
    geographic: hasGeographicComponent( input ),
    relationships: hasRelationshipComponent( input )
  }
}

function applyVisualStyle( config: any, type: string ) {
  const baseColors = {
    topics: '#E393E6',
    events: '#79FFE1',
    personnel: '#27F1FF',
    organizations: '#7c89b9',
    testimonies: '#FA1E4E'
  }

  // Apply type-specific enhancements
  switch ( type ) {
    case 'network':
      return enhanceNetworkStyle( config, baseColors )
    case 'timeline':
      return enhanceTimelineStyle( config, baseColors )
    case 'geographic':
      return enhanceGeographicStyle( config, baseColors )
    default:
      return enhanceChartStyle( config, baseColors )
  }
}

const querySchema = z.object( {
  query: z.string(),
  suggestedVisualization: z.object( {
    type: z.enum( ['network', 'timeline', 'geographic', 'chart'] ),
    config: visualizationSchema
  } ).optional()
} )

export async function generateQuery( input: string ) {
  "use server"
  try {
    // Analyze query intent
    const queryIntent = await analyzeQueryIntent( input )

    const result = await generateObject( {
      model: openai( "gpt-4o" ),
      system: systemPrompt,
      prompt: `Generate an appropriate SQL query and suggest visualization based on this request: ${input}
      
      Query Intent Analysis:
      - Primary Focus: ${queryIntent.focus}
      - Entity Types: ${queryIntent.entityTypes.join( ', ' )}
      - Time Component: ${queryIntent.temporal ? 'Yes' : 'No'}
      - Geographic Component: ${queryIntent.geographic ? 'Yes' : 'No'}
      - Relationship Analysis: ${queryIntent.relationships ? 'Yes' : 'No'}
      
      Consider appropriate:
      1. Joins and relationships
      2. Aggregations and grouping
      3. Temporal patterns if applicable
      4. Geographic clustering if applicable
      5. Network analysis if looking at relationships
      `,
      schema: querySchema,
    } )

    return result.object
  } catch ( e ) {
    console.error( e )
    throw new Error( "Failed to generate query" )
  }
}

export async function runGenerateSQLQuery( query: string ) {
  "use server"

  // Enhanced query validation
  if ( !isValidQuery( query ) ) {
    throw new Error( "Invalid or unsafe query detected" )
  }

  try {
    // Execute query with timeout protection
    const data: any = await Promise.race( [
      sql.query( query ),
      new Promise( ( _, reject ) =>
        setTimeout( () => reject( new Error( "Query timeout" ) ), 30000 )
      )
    ] )

    // Analyze results for visualization
    const results = data.rows
    const visualization = await analyzeResults( results, query )

    return {
      rows: results,
      visualization
    }

  } catch ( e: any ) {
    handleQueryError( e )
  }
}

export async function explainQuery( input: string, sqlQuery: string ) {
  "use server"
  try {
    const result = await generateObject( {
      model: openai( "gpt-4o" ),
      schema: z.object( {
        explanations: explanationsSchema,
        suggestedAnalysis: z.array( z.object( {
          type: z.string(),
          description: z.string(),
          relevance: z.number()
        } ) )
      } ),
      system: `You are a SQL (postgres) expert who:
      1. Explains query components clearly
      2. Identifies key analysis patterns:
         - Network analysis (relationships)
         - Temporal analysis (trends)
         - Geographic analysis (locations)
         - Entity analysis (comparisons)
      3. Suggests additional analyses
      
      Schema: ${schemaString}`,
      prompt: `Explain this query and suggest related analyses:

      User Request: ${input}
      SQL Query: ${sqlQuery}
      
      Break down:
      1. Query components and their purpose
      2. Analysis patterns used
      3. Potential additional analyses
      `
    } )
    return result.object
  } catch ( e ) {
    console.error( e )
    throw new Error( "Failed to explain query" )
  }
}

export async function generateChartConfig(
  results: any,
  userQuery: string,
) {
  "use server"

  try {
    // Analyze data characteristics
    const dataTypes = inferDataTypes( results )
    const temporalFields = findTemporalFields( results )
    const geographicFields = findGeographicFields( results )
    const relationships = inferRelationships( results )

    // Determine best visualization approach
    const vizType = determineVisualizationType( {
      dataTypes,
      temporalFields,
      geographicFields,
      relationships,
      userQuery
    } )

    const { object: config } = await generateObject( {
      model: openai( "gpt-4o" ),
      system: `You are a data visualization expert who creates optimal visualizations based on:
      1. Data characteristics (temporal, geographic, relational)
      2. Query intent and context
      3. Best practices for chosen visualization type`,
      prompt: `Generate visualization config for:
      
      User Query: ${userQuery}
      Data: ${JSON.stringify( results, null, 2 )}
      Suggested Type: ${vizType}
      
      Consider:
      - Data patterns and relationships
      - Temporal or geographic components
      - Entity relationships if present
      - Appropriate visual encodings
      `,
      schema: visualizationSchema
    } )

    // Apply consistent styling
    const enhancedConfig = applyVisualStyle( config, vizType )
    console.log( enhancedConfig )
    return { config: enhancedConfig }
  } catch ( e: any ) {
    console.error( e.message )
    throw new Error( "Failed to generate visualization config" )
  }
}

// Helper functions
