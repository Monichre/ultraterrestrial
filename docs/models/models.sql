CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    summary TEXT
);


-- Create 'personnel' table
CREATE TABLE personnel (
    id VARCHAR(255) PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    role TEXT,
    photo TEXT,
    facebook TEXT,
    twitter TEXT,
    website TEXT,
    instagram TEXT
);

-- Create 'events' table
CREATE TABLE events (
    id VARCHAR(255) PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    date TEXT,
    location TEXT,
    latitude FLOAT,
    longitude FLOAT
);

-- Create 'organizations' table
CREATE TABLE organizations (
    id VARCHAR(255) PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT,
    description TEXT,
    photo TEXT
);

-- Create 'sightings' table
CREATE TABLE sightings (
    id VARCHAR(255) PRIMARY KEY,
    date TIMESTAMP,
    description TEXT,
    media_link TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    shape TEXT,
    duration_seconds TEXT,
    duration_hours_min TEXT,
    comments TEXT,
    date_posted TIMESTAMP,
    latitude FLOAT,
    longitude FLOAT
);

-- Create link table 'testimonies'
CREATE TABLE testimonies (
    id VARCHAR(255) PRIMARY KEY,
    claim TEXT,
    event_id VARCHAR(255) REFERENCES events(id),
    summary TEXT,
    documentation TEXT,
    witness_id VARCHAR(255) REFERENCES personnel(id)
);

-- Create link table 'event-subject-matter-experts'
CREATE TABLE event_subject_matter_experts (
    id VARCHAR(255) PRIMARY KEY,
    event_id VARCHAR(255) REFERENCES events(id),
    subject_matter_expert_id VARCHAR(255) REFERENCES personnel(id)
);

-- Create link table 'topic-subject-matter-experts'
CREATE TABLE topic_subject_matter_experts (
    id VARCHAR(255) PRIMARY KEY,
    topic_id VARCHAR(255) REFERENCES topics(id),
    subject_matter_expert_id VARCHAR(255) REFERENCES personnel(id)
);

-- Create link table 'organization-members'
CREATE TABLE organization_members (
    id VARCHAR(255) PRIMARY KEY,
    member_id VARCHAR(255) REFERENCES personnel(id),
    organization_id VARCHAR(255) REFERENCES organizations(id)
);

-- Create link table 'event-topic-subject-matter-experts'
CREATE TABLE event_topic_subject_matter_experts (
    id VARCHAR(255) PRIMARY KEY,
    event_id VARCHAR(255) REFERENCES events(id),
    subject_matter_expert_id VARCHAR(255) REFERENCES personnel(id),
    topic_id VARCHAR(255) REFERENCES topics(id)
);


-- Create link table 'topics-testimonies'
CREATE TABLE topics_testimonies (
    id VARCHAR(255) PRIMARY KEY,
    topic_id VARCHAR(255) REFERENCES topics(id),
    testimony_id VARCHAR(255) REFERENCES testimonies(id)
);
