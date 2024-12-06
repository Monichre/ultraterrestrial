// hooks/useChartTransform.ts
import { validateChartData, transformDataForMultiLineChart, formatChartValue } from '@/lib/rechart-format'
import { useMemo } from 'react'
import type { Config } from 'tailwind-merge'

interface ChartHookOptions {
  formatType?: 'percentage' | 'currency' | 'number' | 'date'
  requiredFields?: string[]
}

interface UseChartTransformResult {
  chartData: any[]
  xAxisField: string
  lineFields: string[]
  formatValue: ( value: number | string | null ) => string
  isEmpty: boolean
  error: Error | null
}

export function useChartTransform(
  rawData: Record<string, any>[],
  config: Config,
  options: ChartHookOptions = {}
): UseChartTransformResult {
  const {
    formatType = 'number',
    requiredFields = [],
    ...transformOptions
  } = options

  return useMemo( () => {
    try {
      // Validate data if required fields are specified
      const validData = requiredFields.length
        ? validateChartData( rawData, requiredFields )
        : rawData

      // Transform data for chart
      const {
        data: chartData,
        xAxisField,
        lineFields
      } = transformDataForMultiLineChart(
        validData,
        config,
        transformOptions
      )

      // Create value formatter
      const formatValue = ( value: number | string | null ) =>
        formatChartValue( value, formatType )

      return {
        chartData,
        xAxisField,
        lineFields,
        formatValue,
        isEmpty: chartData.length === 0,
        error: null
      }
    } catch ( error ) {
      console.error( 'Error transforming chart data:', error )
      return {
        chartData: [],
        xAxisField: '',
        lineFields: [],
        formatValue: () => 'N/A',
        isEmpty: true,
        error: error as Error
      }
    }
  }, [rawData, config, options] )
}

// Example usage in a component:
/*
function MultiLineChart({ data, config }) {
  const { 
    chartData, 
    xAxisField, 
    lineFields,
    formatValue,
    isEmpty,
    error 
  } = useChartTransform(data, config, {
    formatType: 'percentage',
    dateFormat: true,
    requiredFields: ['date', 'category', 'value']
  });

  if (error) {
    return <div>Error loading chart: {error.message}</div>;
  }

  if (isEmpty) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <XAxis 
          dataKey={xAxisField} 
          tickFormatter={(value) => formatValue(value)}
        />
        <YAxis 
          tickFormatter={(value) => formatValue(value)}
        />
        <Tooltip 
          formatter={(value) => formatValue(value)}
        />
        <Legend />
        {lineFields.map((field) => (
          <Line 
            key={field}
            type="monotone"
            dataKey={field}
            stroke={`hsl(var(--chart-${field}))`}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
*/