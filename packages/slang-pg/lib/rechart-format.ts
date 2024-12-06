// lib/charts/transformers.ts
import { Config } from "./types"

interface InputDataPoint {
  [key: string]: string | number
}

interface TransformedDataPoint {
  [key: string]: string | number | null
}

interface TransformationResult {
  data: TransformedDataPoint[]
  xAxisField: string
  lineFields: string[]
}

interface TransformationOptions {
  defaultXAxis?: string
  sortDirection?: 'asc' | 'desc'
  nullValue?: null | number
  dateFormat?: boolean
}

/**
 * Transforms raw data into format suitable for ReCharts multi-line charts
 * @param data Raw data points
 * @param chartConfig Chart configuration
 * @param options Transformation options
 * @returns Transformed data ready for ReCharts
 */
export function transformDataForMultiLineChart(
  data: InputDataPoint[],
  chartConfig: Config,
  options: TransformationOptions = {}
): TransformationResult {
  if ( !data.length ) {
    return { data: [], xAxisField: '', lineFields: [] }
  }

  const {
    defaultXAxis = 'year',
    sortDirection = 'asc',
    nullValue = null,
    dateFormat = false
  } = options

  // Extract configuration
  const {
    xKey,
    lineCategories,
    measurementColumn
  } = chartConfig

  // Determine fields
  const fields = Object.keys( data[0] )
  const xAxisField = xKey ?? defaultXAxis
  const lineField = fields.find(
    field => lineCategories?.includes( data[0][field] as string )
  ) ?? ''

  // Get unique x-axis values
  const xAxisValues = Array.from(
    new Set(
      data.map( item =>
        dateFormat
          ? new Date( item[xAxisField] ).toISOString()
          : String( item[xAxisField] )
      )
    )
  )

  // Transform data points
  const transformedData: TransformedDataPoint[] = xAxisValues.map( xValue => {
    // Initialize data point with x-axis value
    const dataPoint: TransformedDataPoint = {
      [xAxisField]: dateFormat ? new Date( xValue ) : xValue
    }

    // Add values for each category
    lineCategories?.forEach( category => {
      const matchingItem = data.find( item =>
        dateFormat
          ? new Date( item[xAxisField] ).toISOString() === xValue
          : String( item[xAxisField] ) === xValue &&
          String( item[lineField] ) === category
      )

      dataPoint[category] = matchingItem
        ? matchingItem[measurementColumn ?? ""]
        : nullValue
    } )

    return dataPoint
  } )

  // Sort transformed data
  const sortedData = transformedData.sort( ( a, b ) => {
    const aValue = dateFormat
      ? ( a[xAxisField] as Date ).getTime()
      : Number( a[xAxisField] )
    const bValue = dateFormat
      ? ( b[xAxisField] as Date ).getTime()
      : Number( b[xAxisField] )

    return sortDirection === 'asc'
      ? aValue - bValue
      : bValue - aValue
  } )

  return {
    data: sortedData,
    xAxisField,
    lineFields: lineCategories ?? []
  }
}

/**
 * Validates and preprocesses data for chart transformation
 * @param data Raw data to validate
 * @param requiredFields Array of required field names
 * @returns Validated and preprocessed data
 */
export function validateChartData(
  data: InputDataPoint[],
  requiredFields: string[]
): InputDataPoint[] {
  if ( !data.length ) {
    throw new Error( 'No data provided for transformation' )
  }

  const missingFields = requiredFields.filter(
    field => !Object.keys( data[0] ).includes( field )
  )

  if ( missingFields.length ) {
    throw new Error(
      `Missing required fields: ${missingFields.join( ', ' )}`
    )
  }

  return data.filter( item =>
    requiredFields.every( field =>
      item[field] !== undefined &&
      item[field] !== null
    )
  )
}

/**
 * Formats values for chart display
 * @param value Raw value to format
 * @param type Type of formatting to apply
 * @returns Formatted value
 */
export function formatChartValue(
  value: number | string | null,
  type: 'percentage' | 'currency' | 'number' | 'date'
): string {
  if ( value === null ) return 'N/A'

  switch ( type ) {
    case 'percentage':
      return `${Number( value ).toFixed( 1 )}%`
    case 'currency':
      return new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        currency: 'USD'
      } ).format( Number( value ) )
    case 'number':
      return new Intl.NumberFormat( 'en-US' ).format( Number( value ) )
    case 'date':
      return new Date( value ).toLocaleDateString()
    default:
      return String( value )
  }
}

// Example usage:
// const chartData = validateChartData(rawData, ['year', 'category', 'value']);
// const transformedData = transformDataForMultiLineChart(chartData, config, {
//   dateFormat: true,
//   sortDirection: 'desc'
// });