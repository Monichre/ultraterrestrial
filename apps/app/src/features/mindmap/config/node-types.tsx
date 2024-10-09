import {
  EntityGroupNode,
  EntityGroupNodeChild,
  EntityNode,
  TestimonyNode,
} from '@/features/mindmap/components/nodes'
import { DocumentNode } from '@/features/mindmap/components/nodes/document-node'
import { PersonnelGroupNode } from '@/features/mindmap/components/nodes/personnel-group-node'
import { UserInputNode } from '@/features/mindmap/components/nodes/user-input-node'

export const nodeTypes: any = {
  eventsNode: EntityNode,
  testimoniesNode: TestimonyNode,
  userInputNode: UserInputNode,
  personnelNode: EntityNode,
  topicsNode: EntityNode,
  organizationsNode: EntityNode,
  documentNode: DocumentNode,
  entityGroupNode: EntityGroupNode,
  personnelGroupNode: PersonnelGroupNode,
  entityGroupNodeChildEvents: EntityGroupNodeChild,
  entityGroupNodeChildTopics: EntityNode,
  entityGroupNodeChildTestimonies: TestimonyNode,
  entityGroupNodeChildOrganizations: EntityGroupNodeChild,
  entityGroupNodeChildPersonnel: EntityGroupNodeChild,
  entityGroupNodeChildDocuments: DocumentNode,
}
