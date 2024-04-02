import { type SchemaTypeDefinition } from 'sanity'
import { 
  topic, organization, testimony, dossier,
  event, personnel, 
} from "./schemas"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [  topic, organization, testimony, dossier,
  event, personnel],
}
