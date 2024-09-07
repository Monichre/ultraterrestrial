export const ROOT_NODES = [
  'topics',
  'events',
  'personnel',
  'testimonies',
  'organizations',
  'testimonies',
]

export const ROOT_NODE_IDS = ROOT_NODES.map((type) => `${type}-root-node`)

export const ROOT_NODE_POSITIONS: any = {
  events: {
    x: -300,
    y: 300,
    childNodeDirection: 'left',
  },
  topics: {
    x: 0,
    y: 300,
    childNodeDirection: 'below',
  },
  personnel: {
    x: 300,
    y: 300,
    childNodeDirection: 'above',
  },
  testimonies: {
    x: 600,
    y: 300,
    childNodeDirection: 'below',
  },
  organizations: {
    x: 900,
    y: 300,
    childNodeDirection: 'right',
  },
}

// !TODO: Make this responsive

export const ROOT_NODE_WIDTH = 225
export const ROOT_NODE_HEIGHT = 200

export const BASE_ENTITY_NODE_WIDTH = 300
export const BASE_ENTITY_NODE_HEIGHT = 100
export const NODE_SPACE = 50

export const ROOT_DIMENSIONS = {
  width: ROOT_NODE_WIDTH,
  height: ROOT_NODE_HEIGHT,
}

export const GROUP_NODE_DIMENSIONS = {
  height: 650,
  width: 650,
}
export const CHILD_DIMENSIONS = {
  width: BASE_ENTITY_NODE_WIDTH,
  height: BASE_ENTITY_NODE_HEIGHT,
}
export const PADDING = 75
