# Ultraterrestrial Named Entity Recognition (NER) Schema

## NER Entity Types

### PERSON
- Labels: PERSONNEL, KEY_FIGURE, WITNESS, RESEARCHER, GOVERNMENT_OFFICIAL, INSIDER
- Attributes:
  - role: [witness, researcher, official, insider]
  - credibility: numeric(1-10)
  - authority: numeric(1-10)
  - expertise: list[TOPIC]

### EVENT
- Labels: EVENT, SIGHTING, ABDUCTION, INCIDENT, CONFERENCE
- Attributes:
  - category: [sighting, abduction, incident, conference]
  - date: datetime
  - location: LOCATION
  - duration: duration
  - status: [investigated, unsolved, debunked]

### ORGANIZATION
- Labels: ORGANIZATION, AGENCY, INSTITUTION, GROUP, MEDIA
- Attributes:
  - type: [government, research, enthusiast, media]
  - specialization: text
  - founded_date: datetime
  - scope: [local, national, international]

### LOCATION
- Labels: LOCATION, SITE, AREA, COORDINATES
- Attributes:
  - coordinates: [latitude, longitude]
  - location_type: [urban, rural, remote]
  - administrative: [city, state, country]

### TESTIMONY
- Labels: TESTIMONY, ACCOUNT, STATEMENT, REPORT
- Attributes:
  - type: [personal, official, expert, media]
  - verification: [verified, unverified, debunked]
  - source_type: [interview, document, recording]
  - date: datetime

### TOPIC
- Labels: TOPIC, THEORY, PHENOMENON, TECHNOLOGY
- Attributes:
  - category: [phenomenon, technology, mythology]
  - status: [accepted, hypothetical, debunked]
  - evidence_level: [theoretical, documented, proven]

### ARTIFACT
- Labels: ARTIFACT, EVIDENCE, RELIC, DOCUMENTATION
- Attributes:
  - type: [physical, photo, audio, video]
  - condition: [pristine, damaged, degraded]
  - authenticity: [verified, unverified, disputed]
  - origin: text

### CASEFILE
- Labels: CASEFILE, DOSSIER, INVESTIGATION, FILE
- Attributes:
  - status: [open, closed, investigating]
  - classification: [public, restricted, classified]
  - priority: [low, medium, high]
  - type: [incident, investigation, archive]

## Entity Relations

### Primary Relations
1. PERSON_ORGANIZATION
   - Type: many-to-many
   - Properties: [role, dates, authority_level]

2. EVENT_LOCATION
   - Type: many-to-one
   - Properties: [duration, significance]

3. TESTIMONY_EVENT
   - Type: many-to-one
   - Properties: [reliability, corroboration]

4. PERSON_TESTIMONY
   - Type: one-to-many
   - Properties: [role, credibility]

5. ARTIFACT_EVENT
   - Type: many-to-one
   - Properties: [relevance, condition]

### Secondary Relations
1. TOPIC_EXPERT
   - Type: many-to-many
   - Properties: [expertise_level, verification]

2. EVENT_TOPIC
   - Type: many-to-many
   - Properties: [relevance, certainty]

3. CASEFILE_DOCUMENT
   - Type: one-to-many
   - Properties: [importance, classification]

## Text Extraction Rules

### Priority Extraction
1. Named Individuals
   - Pattern: PERSON followed by role or title
   - Context: Within formal documents or testimonies

2. Event Details
   - Pattern: Date + Location + Event Type
   - Context: Incident reports or sighting descriptions

3. Organization References
   - Pattern: ORGANIZATION + activity/involvement
   - Context: Official documents or statements

### Context Rules
1. Temporal References
   - Extract: Dates, time periods, durations
   - Link: To nearest EVENT or TESTIMONY

2. Location References
   - Extract: Place names, coordinates, regions
   - Link: To nearest EVENT or ARTIFACT

3. Authority References
   - Extract: Titles, roles, clearances
   - Link: To nearest PERSON or ORGANIZATION

## Extraction Confidence Levels

### High Confidence (0.9-1.0)
- Official documents with clear entity markers
- Direct quotes with attributed sources
- Verified government records

### Medium Confidence (0.6-0.8)
- Secondary source documents
- Corroborated testimonies
- Media reports with multiple sources

### Low Confidence (0.3-0.5)
- Unverified witness accounts
- Historical documents without clear provenance
- Third-hand reports

## Special Handling Instructions

### Classified Information
- Retain classification markers
- Note source restrictions
- Track information chain of custody

### Conflicting Information
- Record all versions
- Note contradictions
- Track source reliability

### Cross-References
- Link related entities
- Note relationship strength
- Track information flow

## Schema Version: 1.0
- Last Updated: 2025-01-26
- Status: Production
- Review Cycle: Quarterly