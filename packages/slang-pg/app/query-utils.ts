// lib/query-utils.ts

interface QueryIntent {
  type: 'network' | 'temporal' | 'geographic' | 'comparative'
  metrics?: string[]
  timeframe?: string
  grouping?: string[]
  aggregation?: string
}

export function addAggregations( baseQuery: string, queryIntent: QueryIntent ): string {
  if ( !queryIntent.metrics?.length && !queryIntent.grouping?.length ) {
    return baseQuery
  }

  // Extract the main part of the query before any existing GROUP BY or ORDER BY
  const mainQuery = baseQuery.split( /\bGROUP BY\b|\bORDER BY\b/i )[0]

  // Build aggregation expressions
  const aggregations = queryIntent.metrics?.map( metric => {
    switch ( queryIntent.aggregation ) {
      case 'average':
        return `AVG(${metric}) as avg_${metric}`
      case 'sum':
        return `SUM(${metric}) as total_${metric}`
      case 'count':
        return `COUNT(${metric}) as count_${metric}`
      case 'min':
        return `MIN(${metric}) as min_${metric}`
      case 'max':
        return `MAX(${metric}) as max_${metric}`
      default:
        return metric
    }
  } ) || []

  // Add grouping fields to selection
  const groupingFields = queryIntent.grouping || []
  const allSelections = [...groupingFields, ...aggregations]

  // Rebuild the query with aggregations
  let enhancedQuery = mainQuery.replace(
    /SELECT\s+.+?\s+FROM/i,
    `SELECT ${allSelections.join( ', ' )} FROM`
  )

  // Add GROUP BY if there are grouping fields
  if ( groupingFields.length > 0 ) {
    enhancedQuery += ` GROUP BY ${groupingFields.join( ', ' )}`
  }

  // Add ORDER BY if relevant
  if ( queryIntent.type === 'temporal' ) {
    enhancedQuery += ` ORDER BY ${groupingFields[0]}`
  }

  return enhancedQuery
}

export function inferMainTable( query: string ): string {
  // Regular expressions for different SQL patterns
  const patterns = [
    // Match FROM clause with optional schema
    /FROM\s+(?:[\w-]+\.)?(["\w-]+)(?:\s|$)/i,
    // Match first table in a JOIN
    /FROM\s+(?:[\w-]+\.)?(["\w-]+)\s+(?:LEFT|RIGHT|INNER|OUTER)?\s*JOIN/i,
    // Match CTE (Common Table Expression) reference
    /WITH\s+[\w-]+\s+AS\s*\([^)]*\)\s*SELECT.*?FROM\s+(?:[\w-]+\.)?(["\w-]+)(?:\s|$)/is
  ]

  for ( const pattern of patterns ) {
    const match = query.match( pattern )
    if ( match && match[1] ) {
      return match[1].replace( /"/g, '' )
    }
  }

  throw new Error( 'Could not determine main table from query' )
}

export function inferRelationships( query: string ): Map<string, string[]> {
  const relationships = new Map<string, string[]>()

  // Regular expressions for different join patterns
  const patterns = [
    // Standard JOIN syntax
    /(\w+)\s+(?:LEFT|RIGHT|INNER|OUTER)?\s*JOIN\s+(\w+)\s+ON\s+\w+\.(\w+)\s*=\s*\w+\.(\w+)/gi,
    // Alternative using WHERE clause
    /FROM\s+(\w+)(?:\s*,\s*(\w+))+\s+WHERE.*?(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/gi,
    // USING clause
    /(\w+)\s+JOIN\s+(\w+)\s+USING\s*\(([^)]+)\)/gi
  ]

  // Helper to add bidirectional relationship
  const addRelationship = ( table1: string, table2: string ) => {
    if ( !relationships.has( table1 ) ) {
      relationships.set( table1, [] )
    }
    if ( !relationships.has( table2 ) ) {
      relationships.set( table2, [] )
    }
    if ( !relationships.get( table1 )!.includes( table2 ) ) {
      relationships.get( table1 )!.push( table2 )
    }
    if ( !relationships.get( table2 )!.includes( table1 ) ) {
      relationships.get( table2 )!.push( table1 )
    }
  }

  // Process each pattern
  patterns.forEach( pattern => {
    let match
    while ( ( match = pattern.exec( query ) ) !== null ) {
      if ( pattern.source.includes( 'USING' ) ) {
        // Handle USING clause
        const [_, table1, table2, columns] = match
        addRelationship( table1, table2 )
      } else if ( pattern.source.includes( 'WHERE' ) ) {
        // Handle WHERE clause joins
        const [_, table1, table2] = match
        if ( table1 && table2 ) {
          addRelationship( table1, table2 )
        }
      } else {
        // Handle standard JOIN syntax
        const [_, table1, table2] = match
        addRelationship( table1, table2 )
      }
    }
  } )

  return relationships
}

// Additional utility functions for query analysis
export function analyzeSortingAndLimits( query: string ): {
  sorting: { column: string; direction: 'ASC' | 'DESC' }[]
  limit?: number
  offset?: number
} {
  const result = {
    sorting: [] as { column: string; direction: 'ASC' | 'DESC' }[],
    limit: undefined as number | undefined,
    offset: undefined as number | undefined
  }

  // Extract ORDER BY clause
  const orderByMatch = query.match( /ORDER\s+BY\s+(.+?)(?:LIMIT|OFFSET|$)/i )
  if ( orderByMatch ) {
    const orderClauses = orderByMatch[1].split( ',' ).map( clause => clause.trim() )
    result.sorting = orderClauses.map( clause => {
      const [column, direction] = clause.split( /\s+/ )
      return {
        column,
        direction: ( direction?.toUpperCase() || 'ASC' ) as 'ASC' | 'DESC'
      }
    } )
  }

  // Extract LIMIT
  const limitMatch = query.match( /LIMIT\s+(\d+)/i )
  if ( limitMatch ) {
    result.limit = parseInt( limitMatch[1], 10 )
  }

  // Extract OFFSET
  const offsetMatch = query.match( /OFFSET\s+(\d+)/i )
  if ( offsetMatch ) {
    result.offset = parseInt( offsetMatch[1], 10 )
  }

  return result
}

export function extractJoinConditions( query: string ): Map<string, { table: string; condition: string }[]> {
  const joinConditions = new Map<string, { table: string; condition: string }[]>()

  // Match different JOIN patterns
  const joinPattern = /(\w+)\s+(?:LEFT|RIGHT|INNER|OUTER)?\s*JOIN\s+(\w+)\s+ON\s+(.+?)(?:(?:LEFT|RIGHT|INNER|OUTER)?\s*JOIN|\s*(?:WHERE|GROUP|ORDER|LIMIT|$))/gi

  let match
  while ( ( match = joinPattern.exec( query ) ) !== null ) {
    const [_, table1, table2, condition] = match

    if ( !joinConditions.has( table1 ) ) {
      joinConditions.set( table1, [] )
    }

    joinConditions.get( table1 )!.push( {
      table: table2,
      condition: condition.trim()
    } )
  }

  return joinConditions
}

export function validateAggregations( query: string ): boolean {
  // Check if GROUP BY columns match non-aggregated SELECT columns
  const selectMatch = query.match( /SELECT\s+(.+?)\s+FROM/i )
  const groupByMatch = query.match( /GROUP\s+BY\s+(.+?)(?:HAVING|ORDER|LIMIT|$)/i )

  if ( !selectMatch ) return true // No SELECT clause found
  if ( !groupByMatch && !query.includes( 'COUNT(' ) && !query.includes( 'SUM(' ) &&
    !query.includes( 'AVG(' ) && !query.includes( 'MIN(' ) && !query.includes( 'MAX(' ) ) {
    return true // No aggregation used
  }

  const selectColumns = selectMatch[1].split( ',' ).map( col => {
    col = col.trim()
    // Skip aggregated columns
    if ( col.match( /^(COUNT|SUM|AVG|MIN|MAX)\(/i ) ) return null
    // Extract column name from aliases
    const aliasMatch = col.match( /^.+?\s+as\s+(.+)$/i )
    return aliasMatch ? aliasMatch[1].trim() : col
  } ).filter( col => col !== null )

  if ( !groupByMatch && selectColumns.length > 0 ) {
    return false // Non-aggregated columns without GROUP BY
  }

  if ( groupByMatch ) {
    const groupByColumns = groupByMatch[1].split( ',' ).map( col => col.trim() )
    return selectColumns.every( col =>
      groupByColumns.includes( col! ) || col!.match( /^(COUNT|SUM|AVG|MIN|MAX)\(/i )
    )
  }

  return true
}
