-- Create 'topics' table
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    summary TEXT
);

-- Create 'personnel' table
CREATE TABLE personnel (
    id SERIAL PRIMARY KEY,
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
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    date TEXT,
    location TEXT,
    latitude FLOAT,
    longitude FLOAT
);

-- Create 'organizations' table
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT,
    description TEXT,
    photo TEXT
);

-- Create 'sightings' table
CREATE TABLE sightings (
    id SERIAL PRIMARY KEY,
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

-- Create link table 'event-subject-matter-experts'
CREATE TABLE event_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id),
    subject_matter_expert_id INT REFERENCES personnel(id)
);

-- Create link table 'topic-subject-matter-experts'
CREATE TABLE topic_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(id),
    subject_matter_expert_id INT REFERENCES personnel(id)
);

-- Create link table 'organization-members'
CREATE TABLE organization_members (
    id SERIAL PRIMARY KEY,
    member_id INT REFERENCES personnel(id),
    organization_id INT REFERENCES organizations(id)
);

-- Create link table 'event-topic-subject-matter-experts'
CREATE TABLE event_topic_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id),
    subject_matter_expert_id INT REFERENCES personnel(id),
    topic_id INT REFERENCES topics(id)
);

-- Create link table 'testimonies'
CREATE TABLE testimonies (
    id SERIAL PRIMARY KEY,
    claim TEXT,
    event_id INT REFERENCES events(id),
    summary TEXT,
    documentation TEXT,
    witness_id INT REFERENCES personnel(id)
);

-- Create link table 'topics-testimonies'
CREATE TABLE topics_testimonies (
    id SERIAL PRIMARY KEY,
    topic_id INT REFERENCES topics(id),
    testimony_id INT REFERENCES testimonies(id)
);
