import { xata } from "@/services/xata/client"

export const getAllEvents = async () => {
  return await xata.db.events.sort( 'date', 'desc' ).getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllTopics = async () => {
  return await xata.db.topics.getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllPersonnel = async () => {
  return await xata.db.personnel.sort( 'rank', 'desc' ).getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllTestimonies = async () => {
  return await xata.db.testimonies.getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllOrganizations = async () => {
  return await xata.db.organizations.getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllArtifacts = async () => {
  return await xata.db.artifacts.getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllDocuments = async () => {
  return await xata.db.documents.getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllTopicsExpertsConnections = async () => {
  return await xata.db['topic-subject-matter-experts'].getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllEventsExpertsConnections = async () => {
  return await xata.db['event-subject-matter-experts'].getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

// This is a 3 way link. How to handle?
export const getAllEventsTopicsExpertsConnections = async () => {
  return await xata.db['event-topic-subject-matter-experts'].getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllTopicsTestimoniesConnections = async () => {
  return await xata.db['topics-testimonies'].getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}

export const getAllOrganizationsMembers = async () => {
  return await xata.db['organization-members'].getAll().then( ( res: { toSerializable: () => any } ) => res.toSerializable() )
}
