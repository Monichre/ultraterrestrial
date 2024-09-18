import {
  EntityGroupNode,
  EntityGroupNodeChild,
  EntityNode,
  RootNode,
  TestimonyNode,
} from '@/features/mindmap/nodes'

export const nodeTypes: any = {
  // rootNode: RootNode,
  eventsNode: EntityNode,
  testimoniesNode: TestimonyNode,
  personnelNode: EntityNode,
  topicsNode: EntityNode,
  organizationsNode: EntityNode,
  entityGroupNode: EntityGroupNode,
  entityGroupNodeChildEvents: EntityGroupNodeChild,
  entityGroupNodeChildTopics: EntityNode,
  entityGroupNodeChildTestimonies: TestimonyNode,
  entityGroupNodeChildOrganizations: EntityGroupNodeChild,
  entityGroupNodeChildPersonnel: EntityGroupNodeChild,
}
