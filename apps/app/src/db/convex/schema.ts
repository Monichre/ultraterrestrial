// import { defineSchema, defineTable } from "convex/server"
// import { v } from "convex/values"

// export default defineSchema( {
//   artifacts: defineTable( {
//     date: v.union( v.float64(), v.string() ),
//     description: v.string(),
//     id: v.string(),
//     images: v.string(),
//     name: v.string(),
//     origin: v.string(),
//     photos: v.string(),
//     source: v.string(),
//     xata_id: v.union( v.string(), v.array( v.string() ) ),
//   } ),
//   event_subject_matter_experts: defineTable( {
//     id: v.string(),
//     subject_matter_expert: v.id( "personnel" ),
//     event: v.id( "events" ),
//   } ),
//   event_topic_subject_matter_experts: defineTable( {
//     id: v.string(),
//     subject_matter_expert: v.id( "personnel" ),
//     topic: v.id( "topics" ),
//     event: v.id( "events" ),
//   } ),

//   events: defineTable( {
//     date: v.string(),
//     description: v.string(),
//     id: v.string(),
//     latitude: v.union( v.float64(), v.string() ),
//     location: v.string(),
//     longitude: v.union( v.float64(), v.string() ),
//     metadata: v.string(),
//     name: v.string(),
//     photos: v.string(),
//     summary: v.string(),
//     title: v.string(),
//   } ),
//   locations: defineTable( {
//     id: v.string(),
//     latitude: v.union( v.float64(), v.string() ),
//     longitude: v.union( v.float64(), v.string() ),
//   } ),
//   organization_members: defineTable( {
//     id: v.string(),
//     member: v.id( "personnel" ),
//     organization: v.id( "organizations" ),
//   } ),
//   organizations: defineTable( {
//     description: v.string(),
//     id: v.string(),
//     image: v.string(),
//     name: v.string(),
//     photo: v.string(),
//     specialization: v.string(),
//     title: v.string(),
//   } ),
//   personnel: defineTable( {
//     authority: v.union( v.float64(), v.string() ),
//     bio: v.string(),
//     credibility: v.union( v.float64(), v.string() ),
//     facebook: v.string(),
//     id: v.string(),
//     instagram: v.string(),
//     name: v.string(),
//     photo: v.string(),
//     popularity: v.union( v.float64(), v.string() ),
//     rank: v.union( v.float64(), v.string() ),
//     role: v.string(),
//     twitter: v.string(),
//     website: v.string(),
//   } ),
//   sightings: defineTable( {
//     city: v.string(),
//     comments: v.union( v.float64(), v.string() ),
//     country: v.string(),
//     date: v.string(),
//     date_posted: v.string(),
//     description: v.string(),
//     duration_hours_min: v.union( v.float64(), v.string() ),
//     duration_seconds: v.union( v.float64(), v.string() ),
//     id: v.string(),
//     latitude: v.float64(),
//     longitude: v.float64(),
//     media_link: v.string(),
//     shape: v.string(),
//     state: v.string(),
//   } ),
//   testimonies: defineTable( {
//     claim: v.string(),
//     date: v.string(),
//     documentation: v.string(),
//     event: v.id( "events" ),
//     id: v.string(),
//     organization: v.id( "organizations" ),
//     summary: v.string(),
//     witness: v.id( "personnel" ),
//   } ),
//   topic_subject_matter_experts: defineTable( {
//     id: v.string(),
//     subject_matter_expert: v.id( "personnel" ),
//     topic: v.id( "topics" ),
//   } ),
//   topics: defineTable( {
//     id: v.string(),
//     name: v.string(),
//     photo: v.string(),
//     photos: v.string(),
//     summary: v.string(),
//     title: v.string(),
//   } ),
//   topics_testimonies: defineTable( {
//     id: v.string(),
//     testimony: v.id( "testimonies" ),
//     topic: v.id( "topics" ),
//   } ),
//   user_saved_documents: defineTable( {
//     id: v.string(),
//     document: v.id( "documents" ),
//   } ),
//   user_saved_events: defineTable( {
//     id: v.string(),
//     event: v.id( "events" ),
//   } ),
// } )


import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema( {
  artifacts: defineTable( {
    date: v.union( v.float64(), v.string() ),
    description: v.string(),
    id: v.string(),
    images: v.string(),
    name: v.string(),
    origin: v.string(),
    photos: v.string(),
    source: v.string(),
    xata_id: v.union( v.string(), v.array( v.string() ) ),
  } ),
  // event_subject_matter_experts: defineTable(
  //   v.record( v.string(), v.union( v.float64(), v.string() ) )
  // ),
  // event_topic_subject_matter_experts: defineTable(
  //   v.record( v.string(), v.union( v.float64(), v.string() ) )
  // ),
  events: defineTable( {
    date: v.string(),
    description: v.string(),
    id: v.string(),
    latitude: v.union( v.float64(), v.string() ),
    location: v.string(),
    longitude: v.union( v.float64(), v.string() ),
    metadata: v.string(),
    name: v.string(),
    photos: v.string(),
    summary: v.string(),
    title: v.string(),
  } ),
  // locations: defineTable(
  //   v.record( v.string(), v.union( v.float64(), v.string() ) )
  // ),
  organization_members: defineTable( {
    id: v.string(),
    member: v.string(),
    organization: v.string(),
  } ),
  organizations: defineTable( {
    description: v.string(),
    id: v.string(),
    image: v.string(),
    name: v.string(),
    photo: v.string(),
    specialization: v.string(),
    title: v.string(),
  } ),
  personnel: defineTable( {
    authority: v.union( v.float64(), v.string() ),
    bio: v.string(),
    credibility: v.union( v.float64(), v.string() ),
    facebook: v.string(),
    id: v.string(),
    instagram: v.string(),
    name: v.string(),
    photo: v.string(),
    popularity: v.union( v.float64(), v.string() ),
    rank: v.union( v.float64(), v.string() ),
    role: v.string(),
    twitter: v.string(),
    website: v.string(),
  } ),
  sightings: defineTable( {
    city: v.string(),
    comments: v.union( v.float64(), v.string() ),
    country: v.string(),
    date: v.string(),
    date_posted: v.string(),
    description: v.string(),
    duration_hours_min: v.union( v.float64(), v.string() ),
    duration_seconds: v.union( v.float64(), v.string() ),
    id: v.string(),
    latitude: v.float64(),
    longitude: v.float64(),
    media_link: v.string(),
    shape: v.string(),
    state: v.string(),
  } ),
  testimonies: defineTable( {
    claim: v.string(),
    date: v.string(),
    documentation: v.string(),
    event: v.string(),
    id: v.string(),
    organization: v.string(),
    summary: v.string(),
    witness: v.string(),
  } ),
  // topic_subject_matter_experts: defineTable(
  //   v.record( v.string(), v.union( v.float64(), v.string() ) )
  // ),
  topics: defineTable( {
    id: v.string(),
    name: v.string(),
    photo: v.string(),
    photos: v.string(),
    summary: v.string(),
    title: v.string(),
  } ),
  topics_testimonies: defineTable( {
    id: v.string(),
    testimony: v.string(),
    topic: v.string(),
  } ),
  // user_saved_documents: defineTable(
  //   v.record( v.string(), v.union( v.float64(), v.string() ) )
  // ),
  // user_saved_events: defineTable(
  //   v.record( v.string(), v.union( v.float64(), v.string() ) )
  // ),
} )