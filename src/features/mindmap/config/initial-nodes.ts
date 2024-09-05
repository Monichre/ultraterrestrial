import {
  ROOT_DIMENSIONS,
  ROOT_NODE_IDS,
  ROOT_NODE_POSITIONS,
} from '@/features/mindmap/config/index.config'
import { ENTITY_DATA_VIZ_COLOR_PALETTE } from '@/utils'

const rootContainerNode = {
  id: 'root',
  type: 'group',
  position: {
    x: 0,
    y: 0,
  },
  style: {
    border: '1px solid #eee',
    borderRadius: '5px',
    padding: '10px',
  },
}

const entityRootNodes = ROOT_NODE_IDS.map((id) => {
  const [kind] = id.split('-')
  const type = `${kind}Node`
  const entity = kind.toLocaleLowerCase()
  const label: any =
    kind.toLocaleLowerCase() === 'personnel'
      ? 'Subject Matter Experts'
      : kind.toLocaleLowerCase()
  const position = {
    x: ROOT_NODE_POSITIONS[kind].x,
    y: ROOT_NODE_POSITIONS[kind].y,
  }
  const fill = ENTITY_DATA_VIZ_COLOR_PALETTE[label]
  return {
    id,
    type, // Custom Node Type
    position,
    parentId: rootContainerNode.id,
    extent: 'parent',
    initialWidth: ROOT_DIMENSIONS.width,
    initialHeight: ROOT_DIMENSIONS.height,
    data: {
      fill,
      label,
      type: entity,
    },
  }
})
export const rootNodes = [rootContainerNode, ...entityRootNodes]
