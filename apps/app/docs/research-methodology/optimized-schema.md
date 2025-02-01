# Optimized Database Schema Documentation

## Core Entities

### Topics

**Columns:**

- name: string
- title: string (unique)
- summary: text
- category: string
- related_topics: link → topics
- references: link → documents
- photo: file (defaultPublicAccess: true)
- photos: file[] (defaultPublicAccess: true)

**Reverse Links:**

- topic → topic-subject-matter-experts
- topic → topics-testimonies
- topic → event-topic-subject-matter-experts
- topic → user-saved-topics
- topic → phenomena
- topic → technologies

### Personnel

**Columns:**

- name: string (unique)
- bio: text
- role: string (standardized)
- aliases: string[]
- affiliations: link → organizations
- contact_information: text
- background: text
- photo: file[]
- rank: int (1-100)
- credibility: int (1-100)
- popularity: int (1-100)
- authority: int (1-100)

**Reverse Links:**

- member → organization-members
- subject-matter-expert → event-subject-matter-experts
- subject-matter-expert → topic-subject-matter-experts
- witness → testimonies
- subject-matter-expert → event-topic-subject-matter-experts
- key-figure → user-saved-key-figure
- author → documents
- personnel → theories
- personnel → artifacts

### Events

**Columns:**

- name: text
- title: string (unique)
- description: text
- event_type: string
- status: string
- reported_by: link → personnel
- location: link → locations
- date: datetime
- duration: duration
- photos: file[]
- metadata: json (defaultValue: {})
- summary: text
- category: multiple

**Reverse Links:**

- event → event-subject-matter-experts
- event → testimonies
- event → event-topic-subject-matter-experts
- event → user-saved-events
- event → artifacts
- event → phenomena

### Organizations

**Columns:**

- name: string
- title: string (unique)
- type: string
- specialization: string
- description: text
- logo: file
- image: file (defaultPublicAccess: true)
- founded_date: datetime
- headquarters: link → locations
- website: URL

**Reverse Links:**

- organization → organization-members
- organization → testimonies
- organization → user-saved-organizations
- organization → documents
- organization → events
- organization → technologies

## Evidence Documentation

### Testimonies

**Columns:**

- claim: text
- event: link → events
- summary: text
- witness: link → personnel
- documentation: file[]
- date: datetime
- organization: link → organizations
- source: text
- media: file[] (defaultPublicAccess: true)
- context: text
- testimony_type: string
- verification_status: string
- language: string

**Reverse Links:**

- testimony → topics-testimonies
- testimony → user-saved-testimonies
- testimony → artifacts
- testimony → technologies

### Documents

**Columns:**

- file: file[]
- summary: text
- embedding: vector (dimension: 1536)
- title: string
- date: datetime
- author: link → personnel
- organization: link → organizations
- url: text
- metadata: json
- images: file[] (defaultPublicAccess: true)
- document_type: string
- language: string
- access_level: string

**Reverse Links:**

- document → user-saved-documents
- document → testimonies
- document → events
- document → topics

### Sightings

**Columns:**

- date: datetime
- description: string
- media_link: string
- location: link → locations
- shape: string (standardized)
- intensity: string
- duration: duration
- weather_conditions: string
- comments: string
- date_posted: datetime
- witnesses: link → personnel

**Reverse Links:**

- sighting → user-saved-sightings
- sighting → events
- sighting → artifacts

### Artifacts

**Columns:**

- name: string (unique)
- description: text
- artifact_type: string
- material: string
- condition: string
- date: datetime
- source: text
- origin: text
- location_found: link → locations
- provenance: text
- photos: file[]
- images: file[] (defaultPublicAccess: true)

**Reverse Links:**

- artifact → events
- artifact → personnel
- artifact → theories

## Supporting Entities

### Locations

**Columns:**

- name: string
- address: text
- google_maps_location_id: text
- city: string
- state: string
- country: string
- latitude: float
- longitude: float
- location_type: string

**Reverse Links:**

- location → events
- location → organizations
- location → sightings

### Theories

**Columns:**

- name: string (unique)
- description: text
- related_topics: link → topics
- proposed_by: link → personnel
- evidence: link → artifacts
- status: string

**Reverse Links:**

- theory → events
- theory → testimonies

### Case Files

**Columns:**

- title: string (unique)
- description: text
- related_events: link → events
- related_documents: link → documents
- related_testimonies: link → testimonies
- assigned_personnel: link → personnel
- status: string
- priority: string
- confidentiality_level: string
- date_created: datetime
- last_updated: datetime

**Reverse Links:**

- case_file → organizations
- case_file → artifacts
- case_file → theories
- case_file → locations

## Relationship Tables

### Event-Topic-Subject-Matter-Experts

**Columns:**

- event: link → events
- topic: link → topics
- subject_matter_expert: link → personnel
- expertise_level: string
- contribution_type: string
- organization: link → organizations

### Topic-Subject-Matter-Experts

**Columns:**

- topic: link → topics
- subject_matter_expert: link → personnel
- expertise_details: string
- organization: link → organizations

### Organization-Members

**Columns:**

- member: link → personnel
- organization: link → organizations
- membership_date: datetime
- role_within_organization: string

**Reverse Links:**

- member → events

### Topics-Testimonies

**Columns:**

- topic: link → topics
- testimony: link → testimonies
