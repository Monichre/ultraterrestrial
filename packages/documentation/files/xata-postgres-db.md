CREATE TABLE users_id_mapping (
    old_id text PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE personnel_id_mapping (
    old_id text PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE organizations_id_mapping (
    old_id text PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE topics_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE events_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE testimonies_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE documents_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_theories_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE mindmaps_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE artifacts_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE tags_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE theories_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_saved_events_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_saved_topics_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_saved_key_figure_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_saved_testimonies_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_saved_documents_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_saved_organizations_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE user_saved_sightings_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

CREATE TABLE staging_topics (
    old_id UUID PRIMARY KEY,
    name TEXT,
    summary TEXT,
    photo TEXT,
    photos TEXT[],
    title TEXT UNIQUE
);

CREATE TABLE staging_personnel (
    old_id UUID PRIMARY KEY,
    bio TEXT,
    role TEXT,
    facebook TEXT,
    twitter TEXT,
    website TEXT,
    instagram TEXT,
    photo TEXT[],
    rank INTEGER,
    credibility INTEGER,
    popularity INTEGER,
    name TEXT UNIQUE,
    authority INTEGER
);

CREATE TABLE staging_events (
    old_id UUID PRIMARY KEY,
    name TEXT,
    description TEXT,
    location TEXT,
    latitude FLOAT,
    longitude FLOAT,
    date TIMESTAMP,
    photos TEXT[],
    metadata JSON DEFAULT '{}',
    title TEXT UNIQUE,
    summary TEXT
);

CREATE TABLE staging_organizations (
    old_id UUID PRIMARY KEY,
    name TEXT,
    specialization TEXT,
    description TEXT,
    photo TEXT,
    image TEXT,
    title TEXT UNIQUE
);

CREATE TABLE staging_sightings (
    old_id UUID PRIMARY KEY,
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

CREATE TABLE staging_event_subject_matter_experts (
    old_id UUID PRIMARY KEY,
    event UUID,
    subject_matter_expert UUID
);

CREATE TABLE staging_topic_subject_matter_experts (
    old_id UUID PRIMARY KEY,
    topic UUID,
    subject_matter_expert UUID
);

CREATE TABLE staging_organization_members (
    old_id UUID PRIMARY KEY,
    member UUID,
    organization UUID
);

CREATE TABLE staging_testimonies (
    old_id UUID PRIMARY KEY,
    claim TEXT,
    event UUID,
    summary TEXT,
    witness UUID,
    documentation TEXT[],  
    date TIMESTAMP,
    organization UUID
);

CREATE TABLE staging_topics_testimonies (
    old_id UUID PRIMARY KEY,
    topic UUID,
    testimony UUID
);

CREATE TABLE staging_documents (
    old_id UUID PRIMARY KEY,
    file TEXT[],
    content TEXT,
    embedding FLOAT[],
    title TEXT,
    date TIMESTAMP,
    author UUID,
    organization UUID,
    url TEXT
);

CREATE TABLE staging_locations (
    old_id UUID PRIMARY KEY,
    name TEXT,
    coordinates TEXT,
    google_maps_location_id TEXT,
    city TEXT,
    state TEXT,
    latitude FLOAT,
    longitude FLOAT
);

CREATE TABLE staging_event_topic_subject_matter_experts (
    old_id UUID PRIMARY KEY,
    event UUID,
    topic UUID,
    subject_matter_expert UUID
);

CREATE TABLE staging_users (
    old_id UUID PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    photo TEXT,
    profile_image_url TEXT,
    external_id TEXT
);

CREATE TABLE staging_user_saved_events (
    old_id UUID PRIMARY KEY,
    user UUID,
    event UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

CREATE TABLE staging_user_saved_topics (
    old_id UUID PRIMARY KEY,
    user UUID,
    topic UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

CREATE TABLE staging_user_saved_key_figure (
    old_id UUID PRIMARY KEY,
    user UUID,
    key_figure UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

CREATE TABLE staging_user_saved_testimonies (
    old_id UUID PRIMARY KEY,
    user UUID,
    testimony UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

CREATE TABLE staging_user_saved_documents (
    old_id UUID PRIMARY KEY,
    user UUID,
    document UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

CREATE TABLE staging_user_saved_organizations (
    old_id UUID PRIMARY KEY,
    user UUID,
    organization UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

CREATE TABLE staging_user_saved_sightings (
    old_id UUID PRIMARY KEY,
    user UUID,
    sighting UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

CREATE TABLE staging_tags (
    old_id UUID PRIMARY KEY

);

CREATE TABLE staging_theories (
    old_id UUID PRIMARY KEY

);

CREATE TABLE staging_mindmaps (
    old_id UUID PRIMARY KEY,
    json JSON DEFAULT '{}',
    embedding FLOAT[],
    user UUID,
    file TEXT
);

CREATE TABLE staging_artifacts (
    old_id UUID PRIMARY KEY,
    name TEXT UNIQUE,
    description TEXT,
    photos TEXT[],
    date TEXT,
    source TEXT,
    origin TEXT,
    images TEXT[]
);
