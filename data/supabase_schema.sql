
-- Table: event_subject_matter_experts
CREATE TABLE event_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    event_id INTEGER REFERENCES events(id),
    subject_matter_expert_id INTEGER REFERENCES key_figures(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: event_topic_subject_matter_experts
CREATE TABLE event_topic_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    event_id INTEGER REFERENCES events(id),
    topic_id INTEGER REFERENCES topics(id),
    subject_matter_expert_id INTEGER REFERENCES key_figures(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    name VARCHAR,
    location VARCHAR,
    date TIMESTAMP,
    latitude REAL,
    longitude REAL,
    description TEXT,
    photos JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: organization_members
CREATE TABLE organization_members (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    member_id INTEGER REFERENCES key_figures(id),
    organization_id INTEGER REFERENCES organizations(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: organizations
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    name VARCHAR,
    specialization VARCHAR,
    description TEXT,
    photo TEXT,
    image TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: key_figures
CREATE TABLE key_figures (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    name VARCHAR,
    bio TEXT,
    role VARCHAR,
    facebook VARCHAR,
    twitter VARCHAR,
    website VARCHAR,
    instagram VARCHAR,
    rank INTEGER,
    photo JSONB,
    credibility INTEGER,
    popularity INTEGER,
    authority INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: testimonies
CREATE TABLE testimonies (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    claim TEXT,
    summary TEXT,
    documentation JSONB,
    event_id INTEGER REFERENCES events(id),
    date TIMESTAMP,
    witness_id INTEGER REFERENCES key_figures(id),
    organization_id INTEGER REFERENCES organizations(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: topic_subject_matter_experts
CREATE TABLE topic_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    topic_id INTEGER REFERENCES topics(id),
    subject_matter_expert_id INTEGER REFERENCES key_figures(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: topics_testimonies
CREATE TABLE topics_testimonies (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    topic_id INTEGER REFERENCES topics(id),
    testimony_id INTEGER REFERENCES testimonies(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);

-- Table: topics
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    xata_id VARCHAR UNIQUE,
    name VARCHAR,
    summary TEXT,
    photo TEXT,
    photos JSONB,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    version INTEGER
);
