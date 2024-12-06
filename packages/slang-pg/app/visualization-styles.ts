// lib/visualization-styles.ts


export const baseColors = {
  topics: '#E393E6',
  events: '#79FFE1',
  personnel: '#27F1FF',
  organizations: '#7c89b9',
  testimonies: '#FA1E4E'
} as const

export function enhanceNetworkStyle( config: any, colors: any ): any {
  return {
    ...config,
    colors: {
      ...colors,
      edges: '#718096',
      background: '#1A202C',
      highlight: '#F687B3'
    },
    networkOptions: {
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        timestep: 0.35,
        stabilization: { iterations: 150 }
      },
      nodes: {
        shape: 'dot',
        size: 16,
        borderWidth: 1,
        borderWidthSelected: 2,
        font: {
          size: 12,
          face: 'Inter'
        }
      },
      edges: {
        width: 1,
        selectionWidth: 2,
        smooth: {
          type: 'continuous'
        }
      }
    }
  }
}

export function enhanceTimelineStyle( config: any, colors: any ): any {
  return {
    ...config,
    colors: {
      ...colors,
      axis: '#718096',
      grid: '#2D3748',
      background: '#1A202C'
    },
    timelineOptions: {
      padding: { top: 20, right: 30, bottom: 20, left: 40 },
      markers: {
        size: 8,
        strokeWidth: 2
      },
      axis: {
        fontSize: 12,
        fontFamily: 'Inter',
        tickSize: 5,
        tickPadding: 5
      },
      legend: {
        position: 'top-right',
        symbolSize: 10,
        symbolSpacing: 8
      }
    }
  }
}

export function enhanceGeographicStyle( config: any, colors: any ): any {
  return {
    ...config,
    colors: {
      ...colors,
      water: '#1A365D',
      land: '#2D3748',
      borders: '#4A5568'
    },
    mapOptions: {
      zoom: {
        min: 2,
        max: 18,
        default: 3
      },
      clustering: {
        radius: 40,
        minPoints: 3
      },
      heatmap: {
        blur: 15,
        radius: 10,
        gradient: {
          0.4: colors.events,
          0.6: colors.topics,
          0.8: colors.testimonies,
          1.0: colors.personnel
        }
      }
    }
  }
}

export function enhanceChartStyle( config: any, colors: any ): any {
  return {
    ...config,
    colors: {
      ...colors,
      axis: '#718096',
      grid: '#2D3748',
      background: '#1A202C'
    },
    chartOptions: {
      padding: { top: 20, right: 30, bottom: 40, left: 50 },
      axis: {
        fontSize: 12,
        fontFamily: 'Inter',
        tickSize: 5,
        tickPadding: 5
      },
      grid: {
        stroke: '#2D3748',
        strokeWidth: 1
      },
      legend: {
        position: 'top-right',
        symbolSize: 10,
        symbolSpacing: 8
      },
      tooltip: {
        container: {
          background: '#2D3748',
          border: '1px solid #4A5568',
          borderRadius: '6px',
          padding: '8px 12px'
        }
      }
    }
  }
}