import { DOMAIN_MODEL_COLORS } from '../../utils/constants/colors'

export const eventsRootNode = {
  name: 'events',
  id: 'events-root-node',
  fill: DOMAIN_MODEL_COLORS.events,
  data: {
    type: 'events',
  },
}
export const topicsRootNode = {
  name: 'topics',
  id: 'topics-root-node',
  fill: DOMAIN_MODEL_COLORS.topics,
  data: {
    type: 'topics',
  },
}
export const personnelRootNode = {
  name: 'personnel',
  id: 'personnel-root-node',
  fill: DOMAIN_MODEL_COLORS.personnel,
  data: {
    type: 'personnel',
  },
}
export const testimoniesRootNode = {
  name: 'testimonies',
  id: 'testimonies-root-node',
  fill: DOMAIN_MODEL_COLORS.testimonies,
  data: {
    type: 'testimonies',
  },
}

export const organizationsRootNode = {
  name: 'organizations',
  id: 'organizations-root-node',
  fill: DOMAIN_MODEL_COLORS.organizations,
  data: {
    type: 'organizations',
  },
}

export const rootNodes = [
  eventsRootNode,
  topicsRootNode,
  personnelRootNode,
  testimoniesRootNode,
]
