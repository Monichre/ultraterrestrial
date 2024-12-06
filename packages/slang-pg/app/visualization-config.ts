// lib/visualization-config.ts
import { DataType } from './data-analysis'
import { NetworkNode, NetworkLink, type EntityType } from './types'

export async function generateConfig(
  visualizationType: string,
  data: any[],
  dataTypes: Map<string, DataType>,
  relationships: Map<string, string[]>
): Promise<any> {
  switch ( visualizationType ) {
    case 'network':
      return generateNetworkConfig( data, relationships )
    case 'timeline':
      return generateTimelineConfig( data, dataTypes )
    case 'geographic':
      return generateGeographicConfig( data, dataTypes )
    case 'chart':
      return generateChartConfig( data, dataTypes )
    default:
      throw new Error( `Unsupported visualization type: ${visualizationType}` )
  }
}

function generateNetworkConfig(
  data: any[],
  relationships: Map<string, string[]>
): any {
  // Find the primary entity and its connections
  const nodes: NetworkNode[] = []
  const links: NetworkLink[] = []

  // Process nodes and relationships
  data.forEach( item => {
    if ( item.id && item.name ) {
      nodes.push( {
        id: item.id.toString(),
        label: item.name,
        type: inferEntityType( item ) as EntityType,
        size: calculateNodeSize( item ),
        score: item.authority || item.credibility || 1
      } )
    }
  } )

  // Process relationships
  relationships.forEach( ( targets, source ) => {
    targets.forEach( target => {
      links.push( {
        source: source.toString(),
        target: target.toString(),
        type: 'related',
        weight: 1
      } )
    } )
  } )

  return {
    type: 'network',
    description: 'Network visualization of entity relationships',
    entityTypes: Array.from( new Set( nodes.map( n => n.type ) ) ),
    relationshipTypes: Array.from( new Set( links.map( l => l.type ) ) ),
    nodeSize: 'authority',
    layout: 'force',
    colors: {
      topics: '#E393E6',
      events: '#79FFE1',
      personnel: '#27F1FF',
      organizations: '#7c89b9',
      testimonies: '#FA1E4E'
    }
  }
}

function generateTimelineConfig( data: any[], dataTypes: Map<string, DataType> ): Config {
  // Find the date field
  const dateField = Array.from( dataTypes.entries() )
    .find( ( [_, type] ) => type === 'temporal' )?.[0]

  if ( !dateField ) {
    throw new Error( 'No temporal field found for timeline visualization' )
  }

  // Find fields for measurement
  const measureFields = Array.from( dataTypes.entries() )
    .filter( ( [_, type] ) => type === 'numeric' )
    .map( ( [field] ) => field )

  return {
    type: 'timeline',
    description: 'Timeline visualization of events and metrics',
    entityTypes: ['event', 'testimony', 'artifact'],
    // Start of Selection
    dateRange: {
      start: new Date( Math.min( ...data.map( d => new Date( d[dateField] ).getTime() ) ) ),
      end: new Date( Math.max( ...data.map( d => new Date( d[dateField] ).getTime() ) ) )
    },
    groupBy: 'type',
    xAxis: {
      key: dateField,
      type: 'time',
      label: 'Date'
    },
    yAxis: {
      keys: measureFields,
      type: 'linear',
      label: 'Value'
    }
  }
}

function generateGeographicConfig( data: any[], dataTypes: Map<string, DataType> ): Config {
  // Find location fields
  const latField = findFieldByPattern( dataTypes, 'lat' )
  const lonField = findFieldByPattern( dataTypes, 'lon' )

  if ( !latField || !lonField ) {
    throw new Error( 'Required geographic coordinates not found' )
  }

  return {
    type: 'geographic',
    description: 'Geographic visualization of locations and events',
    entityTypes: ['event', 'sighting', 'organization'],
    clusterBy: 'type',
    heatmap: data.length > 100,
    coordinates: {
      latitude: latField,
      longitude: lonField
    },
    colors: {
      heatmap: ['#79FFE1', '#E393E6', '#FA1E4E'],
      markers: {
        event: '#79FFE1',
        sighting: '#27F1FF',
        organization: '#7c89b9'
      }
    }
  }
}

function generateChartConfig( data: any[], dataTypes: Map<string, DataType> ): Config {
  // Find appropriate fields for x and y axes
  const categoricalFields = Array.from( dataTypes.entries() )
    .filter( ( [_, type] ) => type === 'categorical' )
    .map( ( [field] ) => field )

  const numericFields = Array.from( dataTypes.entries() )
    .filter( ( [_, type] ) => type === 'numeric' )
    .map( ( [field] ) => field )

  // Choose chart type based on data characteristics
  const chartType = selectChartType( data, categoricalFields, numericFields )

  return {
    type: 'chart',
    description: 'Data visualization chart',
    chartType,
    xAxis: {
      key: categoricalFields[0] || numericFields[0],
      type: categoricalFields.length ? 'category' : 'linear',
      label: formatFieldLabel( categoricalFields[0] || numericFields[0] )
    },
    yAxis: {
      keys: numericFields.slice( 0, 3 ), // Limit to 3 metrics for readability
      type: 'linear',
      label: 'Values'
    },
    colors: {
      primary: '#79FFE1',
      secondary: '#E393E6',
      tertiary: '#FA1E4E'
    },
    legend: numericFields.length > 1
  }
}

// Helper functions
function inferEntityType( item: any ): string {
  if ( item.role || item.authority ) return 'person'
  if ( item.location || item.coordinates ) return 'event'
  if ( item.specialization ) return 'organization'
  if ( item.claim || item.summary ) return 'testimony'
  return 'topic'
}

function calculateNodeSize( item: any ): number {
  const baseSize = 10
  const authority = item.authority || 1
  const connections = item.connections || 1
  return baseSize * Math.sqrt( authority * connections )
}

function findFieldByPattern( dataTypes: Map<string, DataType>, pattern: string ): string | null {
  return Array.from( dataTypes.keys() )
    .find( field => field.toLowerCase().includes( pattern ) ) || null
}

function formatFieldLabel( field: string ): string {
  return field
    .split( '_' )
    .map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
    .join( ' ' )
}

function selectChartType(
  data: any[],
  categoricalFields: string[],
  numericFields: string[]
): string {
  if ( numericFields.length > 1 && categoricalFields.length === 0 ) {
    return 'scatter'
  }
  if ( categoricalFields.length === 1 && numericFields.length === 1 ) {
    return data.length > 10 ? 'bar' : 'pie'
  }
  if ( categoricalFields.length === 1 && numericFields.length > 1 ) {
    return 'radar'
  }
  return 'bar'
}