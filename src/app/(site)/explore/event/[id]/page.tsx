import { getXataClient } from '@/lib/xata'
const xata = getXataClient()

const record = await xata.db.events.read('rec_xyz')
console.log(record)

export default async function EventPage({ params: { id } }) {
  const event = await xata.db.events.read(id)

  console.log('event: ', event)

  return <div>Event</div>
}

// Behavior Patterns	Classifying observed behaviors
// Physical Characteristics	Analyzing different physical traits
// Impact + Human Interaction	Examining the effects on humans
// Historical Perspectives	Interactions across historical periods
// Scientific Theories	Exploring various scientific explanations
// Legal + Policy	Laws, regulations, and policies
// Ethical Considerations	Communication and  intervention
// Public Perception	Media, public opinion, and pop culture
// Origins and Intent	Comprehensive view of current theories
