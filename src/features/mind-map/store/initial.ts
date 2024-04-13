'use client'

const root = {
  id: '1',

  text: 'UltraTerrestrial',
  data: {
    content: `
    **Tracking the State of Disclosure**
*Striving to document, explore and disseminate the past, present and future of the UFO topic and its bearing on humanity, the universe and our place within it.`,
    position: { x: 0, y: 0 },
  },
}
const TopicsNode = {
  id: 'Topics',
  text: 'Topics',
  data: {
    position: { x: 0, y: 100 },
  },

  parent: root.id,
}
const PersonnelNode = {
  id: 'Personnel',
  text: 'Personnel',
  data: {
    position: { x: 100, y: 100 },
  },

  parent: root.id,
}
const EventsNode = {
  id: 'Events',
  text: 'Events',
  data: {
    position: { x: 200, y: 100 },
  },

  parent: root.id,
}

const TestimoniesNode = {
  id: 'Testimonies',
  text: 'Testimonies',
  data: {
    position: { x: 300, y: 100 },
  },

  parent: root.id,
}

const OrganizationsNode = {
  id: 'Organizations',
  text: 'Organizations',
  data: {
    position: { x: 400, y: 100 },
  },

  parent: root.id,
}

export const rootNodes = [
  root,
  TopicsNode,
  EventsNode,
  TestimoniesNode,
  OrganizationsNode,
  PersonnelNode,
]
export const rootEdges = [
  {
    id: `${root.id}-${TopicsNode.id}`,
    fromTarget: root.id,
    toTarget: TopicsNode.id,
  },
  {
    id: `${root.id}-${EventsNode.id}`,
    fromTarget: root.id,
    toTarget: EventsNode.id,
  },
  {
    id: `${root.id}-${TestimoniesNode.id}`,
    fromTarget: root.id,
    toTarget: TestimoniesNode.id,
  },
  {
    id: `${root.id}-${OrganizationsNode.id}`,
    fromTarget: root.id,
    toTarget: OrganizationsNode.id,
  },
  {
    id: `${root.id}-${PersonnelNode.id}`,
    fromTarget: root.id,
    toTarget: PersonnelNode.id,
  },
]
