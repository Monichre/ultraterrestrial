export const ROOT_NODES = [
  'topics',
  'events',
  'personnel',
  'testimonies',
  'organizations',
  'testimonies',
]

export const ROOT_NODE_POSITIONS: any = {
  events: {
    x: 0,
    y: 0,
    childNodeDirection: 'left',
  },
  topics: {
    x: 500,
    y: 0,
    childNodeDirection: 'below',
  },
  personnel: {
    x: 1000,
    y: 0,
    childNodeDirection: 'above',
  },
  testimonies: {
    x: 1500,
    y: 0,
    childNodeDirection: 'below',
  },
  organizations: {
    x: 2000,
    y: 0,
    childNodeDirection: 'right',
  },
}

// !TODO: Make this responsive

export const ROOT_NODE_WIDTH = 148
export const ROOT_NODE_HEIGHT = 129
export const NODE_SPACE = 100

export const ROOT_DIMENSIONS = { width: 148, height: 129 }
export const CHILD_DIMENSIONS = { width: 200, height: 100 }
export const PADDING = 100
