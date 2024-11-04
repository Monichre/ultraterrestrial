-- Add this section at the beginning of the file, before any other operations
-- ====================================================
-- Step 0: Setup Migration Infrastructure
-- ====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pg_net";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";



CREATE OR REPLACE FUNCTION fetch_data_from_xata(table_name TEXT, xata_id TEXT) RETURNS jsonb AS $$
DECLARE
    -- Replace these placeholders with your actual Xata workspace details
    workspace TEXT := 'UltraTerrestrial-kgubvq'; -- e.g., 'myworkspace'
    region TEXT := 'us-east-1';       -- e.g., 'us-east-1'
    db_name TEXT := 'ultraterrestrial';          -- e.g., 'ultraterrestrial_db'
    branch TEXT := 'main';              -- e.g., 'main'

    api_key TEXT := 'xau_LKJxzxjzXasEUXxjmhCBACdTCvi5Ed2v1'; -- Replace with your actual Xata API key

    api_url TEXT := 'https://' || workspace || '.' || region || '.xata.sh/db/' || db_name || ':' || branch || '/sql';

    sql_statement TEXT := 'SELECT * FROM "' || table_name || '" WHERE xata_id = ''' || xata_id || '''';

    request_body TEXT := json_build_object('statement', sql_statement)::text;

    response TEXT;

    response_json jsonb;
BEGIN
    -- Make the HTTP POST request to Xata
    response := pg_net.http_post(
        url := api_url,
        body := request_body,
        headers := ARRAY[
            'Content-Type: application/json',
            'Authorization: Bearer ' || api_key
        ]
    );

    -- Convert the response to JSONB
    response_json := response::jsonb;

    RETURN response_json;

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error fetching data from Xata for table % and xata_id %: %', table_name, xata_id, SQLERRM;
        RETURN NULL; -- Return NULL in case of error
END;


CREATE OR REPLACE FUNCTION trigger_fetch_data_generic() RETURNS TRIGGER AS $$
DECLARE
    fetched_data jsonb;
BEGIN
    -- Ensure the table has a 'xata_id' column
    IF NEW.xata_id IS NULL THEN
        RAISE NOTICE 'No xata_id found for table % on record with id %', TG_TABLE_NAME, NEW.id;
        RETURN NEW;
    END IF;

    -- Fetch data from Xata using the xata_id
    fetched_data := fetch_data_from_xata(TG_TABLE_NAME, NEW.xata_id);

    -- Store the fetched data in the 'api_data' column
    NEW.api_data := fetched_data;

    RETURN NEW;
END;


-- Create migration logging table
CREATE TABLE IF NOT EXISTS migration_logs (
    id SERIAL PRIMARY KEY,
    step TEXT NOT NULL,
    status TEXT NOT NULL,
    error_message TEXT,
    affected_rows INTEGER,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    duration INTERVAL
);

CREATE OR REPLACE FUNCTION perform_migration_step(
    step_name TEXT,
    migration_sql TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    start_time TIMESTAMPTZ;
    affected INTEGER;
    log_id INTEGER;
BEGIN
    start_time := NOW();
    
    -- Create log entry
    INSERT INTO migration_logs (step, status, started_at)
    VALUES (step_name, 'IN_PROGRESS', start_time)
    RETURNING id INTO log_id;
    
    -- Execute migration SQL
    EXECUTE migration_sql;
    GET DIAGNOSTICS affected = ROW_COUNT;
    
    -- Update log with success
    UPDATE migration_logs 
    SET status = 'COMPLETED',
        affected_rows = affected,
        completed_at = NOW(),
        duration = NOW() - start_time
    WHERE id = log_id;
    
    RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
    -- Update log with failure
    UPDATE migration_logs 
    SET status = 'FAILED',
        error_message = SQLERRM,
        completed_at = NOW(),
        duration = NOW() - start_time
    WHERE id = log_id;
    
    RAISE NOTICE 'Migration step % failed: %', step_name, SQLERRM;
    RETURN FALSE;
END;


-- 3. Add Data Validation Functions
CREATE OR REPLACE FUNCTION validate_email(email TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$';
END;


-- 4. Add Data Type Conversion Functions
CREATE OR REPLACE FUNCTION safe_cast_to_timestamptz(v TEXT) 
RETURNS TIMESTAMPTZ AS $$
BEGIN
    RETURN v::TIMESTAMPTZ;
EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
END;


CREATE OR REPLACE FUNCTION batch_insert_data(
    source_table TEXT,
    target_table TEXT,
    batch_size INTEGER DEFAULT 10000
) RETURNS INTEGER AS $$
DECLARE
    total_rows INTEGER := 0;
    batch_rows INTEGER;
    last_id INTEGER := 0;
BEGIN
    LOOP
        EXECUTE format('
            WITH batch AS (
                SELECT *
                FROM %I
                WHERE id > $1
                ORDER BY id
                LIMIT $2
            )
            INSERT INTO %I
            SELECT * FROM batch
            RETURNING COUNT(*)',
            source_table, target_table)
        USING last_id, batch_size
        INTO batch_rows;

        EXIT WHEN batch_rows = 0;
        
        total_rows := total_rows + batch_rows;
        last_id := last_id + batch_size;
        
        COMMIT;
    END LOOP;
    
    RETURN total_rows;
END;


-- 5. Add Pre-migration Validation
CREATE OR REPLACE FUNCTION validate_migration_prerequisites()
RETURNS TABLE (
    check_name TEXT,
    status BOOLEAN,
    message TEXT
) AS $$
BEGIN
    -- Check if required extensions exist
    RETURN QUERY
    SELECT 
        'vector_extension'::TEXT,
        EXISTS (
            SELECT 1 
            FROM pg_extension 
            WHERE extname = 'vector'
        ),
        'Vector extension is required'::TEXT;

    -- Check for duplicate emails
    RETURN QUERY
    SELECT 
        'unique_emails'::TEXT,
        NOT EXISTS (
            SELECT email, COUNT(*)
            FROM staging_users
            GROUP BY email
            HAVING COUNT(*) > 1
        ),
        'Duplicate emails found in staging_users'::TEXT;

    -- Add more validation checks as needed
END;


-- 6. Improved COPY Commands with Error Handling
CREATE OR REPLACE FUNCTION safe_copy_data(
    table_name TEXT,
    file_path TEXT,
    columns TEXT DEFAULT NULL
) RETURNS INTEGER AS $$
DECLARE
    copy_sql TEXT;
    affected INTEGER;
BEGIN
    copy_sql := format(
        'COPY %I %s FROM %L WITH (FORMAT CSV, HEADER true, FORCE_NULL (*))',
        table_name,
        COALESCE('(' || columns || ')', ''),
        file_path
    );
    
    EXECUTE copy_sql;
    GET DIAGNOSTICS affected = ROW_COUNT;
    
    RETURN affected;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error copying data into %: %', table_name, SQLERRM;
    RETURN -1;
END;



-- Before creating staging tables, create temporary indexes
SELECT manage_migration_indexes('create');

-- [Original staging table creation code remains here]



CREATE TABLE users_id_mapping (
    old_id text PRIMARY KEY,    -- Adjust the data type based on Xata's ID type
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for personnel
CREATE TABLE personnel_id_mapping (
    old_id text PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for organizations
CREATE TABLE organizations_id_mapping (
    old_id text PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for topics
CREATE TABLE topics_id_mapping (
    old_id UUID PRIMARY KEY,    -- Adjust the data type based on Xata's ID type
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for events
CREATE TABLE events_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for testimonies
CREATE TABLE testimonies_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for documents
CREATE TABLE documents_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_theories
CREATE TABLE user_theories_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for mindmaps
CREATE TABLE mindmaps_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for artifacts
CREATE TABLE artifacts_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for tags
CREATE TABLE tags_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for theories
CREATE TABLE theories_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_saved_events
CREATE TABLE user_saved_events_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_saved_topics
CREATE TABLE user_saved_topics_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_saved_key_figure
CREATE TABLE user_saved_key_figure_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_saved_testimonies
CREATE TABLE user_saved_testimonies_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_saved_documents
CREATE TABLE user_saved_documents_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_saved_organizations
CREATE TABLE user_saved_organizations_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for user_saved_sightings
CREATE TABLE user_saved_sightings_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

--- 


-- Migration Script: Xata to PostgreSQL

-- ====================================================
-- Step 1: Create Staging Tables
-- ====================================================

-- Staging table for topics
CREATE TABLE staging_topics (
    old_id UUID PRIMARY KEY,
    name TEXT,
    summary TEXT,
    photo TEXT,          -- Assuming file URLs or paths are stored as TEXT
    photos TEXT[],       -- Array of file URLs or paths
    title TEXT UNIQUE
);

-- Staging table for personnel
CREATE TABLE staging_personnel (
    old_id UUID PRIMARY KEY,
    bio TEXT,
    role TEXT,
    facebook TEXT,
    twitter TEXT,
    website TEXT,
    instagram TEXT,
    photo TEXT[],        -- Array of file URLs or paths
    rank INTEGER,
    credibility INTEGER,
    popularity INTEGER,
    name TEXT UNIQUE,
    authority INTEGER
);

-- Staging table for events
CREATE TABLE staging_events (
    old_id UUID PRIMARY KEY,
    name TEXT,
    description TEXT,
    location TEXT,
    latitude FLOAT,
    longitude FLOAT,
    date TIMESTAMP,
    photos TEXT[],       -- Array of file URLs or paths
    metadata JSON DEFAULT '{}',
    title TEXT UNIQUE,
    summary TEXT
);

-- Staging table for organizations
CREATE TABLE staging_organizations (
    old_id UUID PRIMARY KEY,
    name TEXT,
    specialization TEXT,
    description TEXT,
    photo TEXT,
    image TEXT,          -- Assuming file URLs or paths are stored as TEXT
    title TEXT UNIQUE
);

-- Staging table for sightings
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

-- Staging table for event-subject-matter-experts
CREATE TABLE staging_event_subject_matter_experts (
    old_id UUID PRIMARY KEY,
    event UUID,
    subject_matter_expert UUID
);

-- Staging table for topic-subject-matter-experts
CREATE TABLE staging_topic_subject_matter_experts (
    old_id UUID PRIMARY KEY,
    topic UUID,
    subject_matter_expert UUID
);

-- Staging table for organization-members
CREATE TABLE staging_organization_members (
    old_id UUID PRIMARY KEY,
    member UUID,
    organization UUID
);

-- Staging table for testimonies
CREATE TABLE staging_testimonies (
    old_id UUID PRIMARY KEY,
    claim TEXT,
    event UUID,
    summary TEXT,
    witness UUID,
    documentation TEXT[],  -- Array of file URLs or paths
    date TIMESTAMP,
    organization UUID
);

-- Staging table for topics-testimonies
CREATE TABLE staging_topics_testimonies (
    old_id UUID PRIMARY KEY,
    topic UUID,
    testimony UUID
);

-- Staging table for documents
CREATE TABLE staging_documents (
    old_id UUID PRIMARY KEY,
    file TEXT[],               -- Array of file URLs or paths
    content TEXT,
    embedding FLOAT[],         -- Assuming vector is stored as an array of floats
    title TEXT,
    date TIMESTAMP,
    author UUID,               -- Old personnel ID
    organization UUID,         -- Old organization ID
    url TEXT
);

-- Staging table for locations
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

-- Staging table for event-topic-subject-matter-experts
CREATE TABLE staging_event_topic_subject_matter_experts (
    old_id UUID PRIMARY KEY,
    event UUID,
    topic UUID,
    subject_matter_expert UUID
);

-- Staging table for users
CREATE TABLE staging_users (
    old_id UUID PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    photo TEXT,               -- Assuming file URLs or paths are stored as TEXT
    profile_image_url TEXT,
    external_id TEXT
);

-- Staging table for user-saved-events
CREATE TABLE staging_user_saved_events (
    old_id UUID PRIMARY KEY,
    user UUID,
    event UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

-- Staging table for user-saved-topics
CREATE TABLE staging_user_saved_topics (
    old_id UUID PRIMARY KEY,
    user UUID,
    topic UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

-- Staging table for user-saved-key-figure
CREATE TABLE staging_user_saved_key_figure (
    old_id UUID PRIMARY KEY,
    user UUID,
    key_figure UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

-- Staging table for user-saved-testimonies
CREATE TABLE staging_user_saved_testimonies (
    old_id UUID PRIMARY KEY,
    user UUID,
    testimony UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

-- Staging table for user-saved-documents
CREATE TABLE staging_user_saved_documents (
    old_id UUID PRIMARY KEY,
    user UUID,
    document UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

-- Staging table for user-saved-organizations
CREATE TABLE staging_user_saved_organizations (
    old_id UUID PRIMARY KEY,
    user UUID,
    organization UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

-- Staging table for user-saved-sightings
CREATE TABLE staging_user_saved_sightings (
    old_id UUID PRIMARY KEY,
    user UUID,
    sighting UUID,
    theory UUID,
    note TEXT,
    note_title TEXT
);

-- Staging table for tags
CREATE TABLE staging_tags (
    old_id UUID PRIMARY KEY
    -- Add additional columns if necessary
);

-- Staging table for theories
CREATE TABLE staging_theories (
    old_id UUID PRIMARY KEY
    -- Add additional columns if necessary
);

-- Staging table for mindmaps
CREATE TABLE staging_mindmaps (
    old_id UUID PRIMARY KEY,
    json JSON DEFAULT '{}',
    embedding FLOAT[],       -- Assuming vector is stored as an array of floats
    user UUID,
    file TEXT               -- Assuming file URLs or paths are stored as TEXT
);

-- Staging table for artifacts
CREATE TABLE staging_artifacts (
    old_id UUID PRIMARY KEY,
    name TEXT UNIQUE,
    description TEXT,
    photos TEXT[],           -- Assuming multiple file URLs or paths
    date TEXT,
    source TEXT,
    origin TEXT,
    images TEXT[]            -- Array of file URLs or paths
);

-- -- Validate prerequisites before loading
-- SELECT * FROM validate_migration_prerequisites();

-- -- Replace COPY commands with safe_copy_data function:
-- -- SELECT safe_copy_data('staging_users', '/path/to/users.csv', 'old_id,email,name,photo,profile_image_url,external_id');
-- -- [Repeat for other tables]

-- -- ====================================================
-- -- Step 2: Load CSV Data into Staging Tables
-- -- ====================================================

-- -- Loading data into staging_topics
-- COPY staging_topics (old_id, name, summary, photo, photos, title)
-- FROM '/path/to/topics.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_personnel
-- COPY staging_personnel (old_id, bio, role, facebook, twitter, website, instagram, photo, rank, credibility, popularity, name, authority)
-- FROM '/path/to/personnel.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_events
-- COPY staging_events (old_id, name, description, location, latitude, longitude, date, photos, metadata, title, summary)
-- FROM '/path/to/events.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_organizations
-- COPY staging_organizations (old_id, name, specialization, description, photo, image, title)
-- FROM '/path/to/organizations.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_sightings
-- COPY staging_sightings (old_id, date, description, media_link, city, state, country, shape, duration_seconds, duration_hours_min, comments, date_posted, latitude, longitude)
-- FROM '/path/to/sightings.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_event_subject_matter_experts
-- COPY staging_event_subject_matter_experts (old_id, event, subject_matter_expert)
-- FROM '/path/to/event_subject_matter_experts.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_topic_subject_matter_experts
-- COPY staging_topic_subject_matter_experts (old_id, topic, subject_matter_expert)
-- FROM '/path/to/topic_subject_matter_experts.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_organization_members
-- COPY staging_organization_members (old_id, member, organization)
-- FROM '/path/to/organization_members.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_testimonies
-- COPY staging_testimonies (old_id, claim, event, summary, witness, documentation, date, organization)
-- FROM '/path/to/testimonies.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_topics_testimonies
-- COPY staging_topics_testimonies (old_id, topic, testimony)
-- FROM '/path/to/topics_testimonies.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_documents
-- COPY staging_documents (old_id, file, content, embedding, title, date, author, organization, url)
-- FROM '/path/to/documents.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_locations
-- COPY staging_locations (old_id, name, coordinates, google_maps_location_id, city, state, latitude, longitude)
-- FROM '/path/to/locations.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_event_topic_subject_matter_experts
-- COPY staging_event_topic_subject_matter_experts (old_id, event, topic, subject_matter_expert)
-- FROM '/path/to/event_topic_subject_matter_experts.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_users
-- COPY staging_users (old_id, email, name, photo, profile_image_url, external_id)
-- FROM '/path/to/users.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_user_saved_events
-- COPY staging_user_saved_events (old_id, user, event, theory, note, note_title)
-- FROM '/path/to/user_saved_events.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_user_saved_topics
-- COPY staging_user_saved_topics (old_id, user, topic, theory, note, note_title)
-- FROM '/path/to/user_saved_topics.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_user_saved_key_figure
-- COPY staging_user_saved_key_figure (old_id, user, key_figure, theory, note, note_title)
-- FROM '/path/to/user_saved_key_figure.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_user_saved_testimonies
-- COPY staging_user_saved_testimonies (old_id, user, testimony, theory, note, note_title)
-- FROM '/path/to/user_saved_testimonies.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_user_saved_documents
-- COPY staging_user_saved_documents (old_id, user, document, theory, note, note_title)
-- FROM '/path/to/user_saved_documents.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_user_saved_organizations
-- COPY staging_user_saved_organizations (old_id, user, organization, theory, note, note_title)
-- FROM '/path/to/user_saved_organizations.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_user_saved_sightings
-- COPY staging_user_saved_sightings (old_id, user, sighting, theory, note, note_title)
-- FROM '/path/to/user_saved_sightings.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_tags
-- COPY staging_tags (old_id)
-- FROM '/path/to/tags.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_theories
-- COPY staging_theories (old_id)
-- FROM '/path/to/theories.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_mindmaps
-- COPY staging_mindmaps (old_id, json, embedding, user, file)
-- FROM '/path/to/mindmaps.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Loading data into staging_artifacts
-- COPY staging_artifacts (old_id, name, description, photos, date, source, origin, images)
-- FROM '/path/to/artifacts.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- ====================================================
-- -- Step 3: Insert Data into Final Tables and Populate Mapping Tables
-- -- ====================================================

-- -- ====================================================
-- -- Step 3: Insert Data into Final Tables and Populate Mapping Tables
-- -- ====================================================

-- -- Migrating users
-- BEGIN;

INSERT INTO users (email, name, photo, profile_image_url, external_id)
SELECT email, name, photo, profile_image_url, external_id
FROM staging_users
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_users_mapping;

INSERT INTO users_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_users_mapping;

COMMIT;

-- Migrating personnel
BEGIN;

INSERT INTO personnel (bio, role, facebook, twitter, website, instagram, photo, rank, credibility, popularity, name, authority)
SELECT bio, role, facebook, twitter, website, instagram, photo, rank, credibility, popularity, name, authority
FROM staging_personnel
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_personnel_mapping;

INSERT INTO personnel_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_personnel_mapping;

COMMIT;

-- Migrating organizations
BEGIN;

INSERT INTO organizations (name, specialization, description, photo, image, title)
SELECT name, specialization, description, photo, image, title
FROM staging_organizations
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_organizations_mapping;

INSERT INTO organizations_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_organizations_mapping;

COMMIT;

-- Migrating topics
BEGIN;

INSERT INTO topics (name, summary, photo, photos, title)
SELECT name, summary, photo, photos, title
FROM staging_topics
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_topics_mapping;

INSERT INTO topics_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_topics_mapping;

COMMIT;

-- Migrating events
BEGIN;

INSERT INTO events (name, description, location, latitude, longitude, date, photos, metadata, title, summary)
SELECT name, description, location, latitude, longitude, date, photos, metadata, title, summary
FROM staging_events
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_events_mapping;

INSERT INTO events_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_events_mapping;

COMMIT;

-- Migrating sightings
BEGIN;

INSERT INTO sightings (date, description, media_link, city, state, country, shape, duration_seconds, duration_hours_min, comments, date_posted, latitude, longitude)
SELECT date, description, media_link, city, state, country, shape, duration_seconds, duration_hours_min, comments, date_posted, latitude, longitude
FROM staging_sightings
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_sightings_mapping;

INSERT INTO sightings_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_sightings_mapping;

COMMIT;

-- Migrating tags
BEGIN;

-- Assuming tags have additional columns, add them accordingly
INSERT INTO tags -- Specify columns if any
SELECT * 
FROM staging_tags
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_tags_mapping;

INSERT INTO tags_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_tags_mapping;

COMMIT;

-- Migrating theories
BEGIN;

-- Assuming theories have additional columns, add them accordingly
INSERT INTO theories -- Specify columns if any
SELECT * 
FROM staging_theories
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_theories_mapping;

INSERT INTO theories_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_theories_mapping;

COMMIT;

-- Migrating mindmaps
BEGIN;

INSERT INTO mindmaps (json, embedding, user_id, file)
SELECT json, embedding::vector, um.new_id AS user_id, file
FROM staging_mindmaps sm
JOIN users_id_mapping um ON sm.user = um.old_id
RETURNING sm.old_id, id AS new_id
INTO TEMP TABLE temp_mindmaps_mapping;

INSERT INTO mindmaps_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_mindmaps_mapping;

COMMIT;

-- Migrating artifacts
BEGIN;

INSERT INTO artifacts (name, description, photos, date, source, origin, images)
SELECT name, description, photos, date, source, origin, images
FROM staging_artifacts
RETURNING old_id, id AS new_id
INTO TEMP TABLE temp_artifacts_mapping;

INSERT INTO artifacts_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_artifacts_mapping;

COMMIT;

-- Migrating testimonies
BEGIN;

INSERT INTO testimonies (claim, event_id, summary, witness_id, documentation, date, organization_id)
SELECT 
    claim, 
    em.new_id AS event_id, 
    summary, 
    pm.new_id AS witness_id, 
    documentation, 
    date, 
    om.new_id AS organization_id
FROM staging_testimonies st
JOIN events_id_mapping em ON st.event = em.old_id
JOIN personnel_id_mapping pm ON st.witness = pm.old_id
JOIN organizations_id_mapping om ON st.organization = om.old_id
RETURNING st.old_id, id AS new_id
INTO TEMP TABLE temp_testimonies_mapping;

INSERT INTO testimonies_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_testimonies_mapping;

COMMIT;


-- ====================================================
-- Step 4: Insert into Join Tables
-- ====================================================

-- Migrating event-subject-matter-experts
BEGIN;

INSERT INTO event_subject_matter_experts (event_id, subject_matter_expert_id)
SELECT 
    em.new_id AS event_id, 
    pm.new_id AS subject_matter_expert_id
FROM staging_event_subject_matter_experts sem
JOIN events_id_mapping em ON sem.event = em.old_id
JOIN personnel_id_mapping pm ON sem.subject_matter_expert = pm.old_id;

COMMIT;

-- Migrating topic-subject-matter-experts
BEGIN;

INSERT INTO topic_subject_matter_experts (topic_id, subject_matter_expert_id)
SELECT 
    tm.new_id AS topic_id, 
    pm.new_id AS subject_matter_expert_id
FROM staging_topic_subject_matter_experts stse
JOIN topics_id_mapping tm ON stse.topic = tm.old_id
JOIN personnel_id_mapping pm ON stse.subject_matter_expert = pm.old_id;

COMMIT;

-- Migrating organization-members
BEGIN;

INSERT INTO organization_members (member_id, organization_id)
SELECT 
    pm.new_id AS member_id, 
    om.new_id AS organization_id
FROM staging_organization_members som
JOIN personnel_id_mapping pm ON som.member = pm.old_id
JOIN organizations_id_mapping om ON som.organization = om.old_id;

COMMIT;

-- Migrating topics-testimonies
BEGIN;

INSERT INTO topics_testimonies (topic_id, testimony_id)
SELECT 
    tm.new_id AS topic_id, 
    tm2.new_id AS testimony_id
FROM staging_topics_testimonies stt
JOIN topics_id_mapping tm ON stt.topic = tm.old_id
JOIN testimonies_id_mapping tm2 ON stt.testimony = tm2.old_id;

COMMIT;

-- Migrating event-topic-subject-matter-experts
BEGIN;

INSERT INTO event_topic_subject_matter_experts (event_id, topic_id, subject_matter_expert_id)
SELECT 
    em.new_id AS event_id, 
    tm.new_id AS topic_id, 
    pm.new_id AS subject_matter_expert_id
FROM staging_event_topic_subject_matter_experts estse
JOIN events_id_mapping em ON estse.event = em.old_id
JOIN topics_id_mapping tm ON estse.topic = tm.old_id
JOIN personnel_id_mapping pm ON estse.subject_matter_expert = pm.old_id;

COMMIT;

-- ====================================================
-- Step 5: Migrate User-Saved Tables
-- ====================================================

-- Migrating user-saved-events
BEGIN;

INSERT INTO user_saved_events (user_id, event_id, theory_id, note, note_title)
SELECT 
    um.new_id AS user_id, 
    em.new_id AS event_id, 
    tm.new_id AS theory_id, 
    note, 
    note_title
FROM staging_user_saved_events sse
JOIN users_id_mapping um ON sse.user = um.old_id
JOIN events_id_mapping em ON sse.event = em.old_id
JOIN user_theories_id_mapping tm ON sse.theory = tm.old_id;

COMMIT;

-- Migrating user-saved-topics
BEGIN;

INSERT INTO user_saved_topics (user_id, topic_id, theory_id, note, note_title)
SELECT 
    um.new_id AS user_id, 
    tm.new_id AS topic_id, 
    tm2.new_id AS theory_id, 
    note, 
    note_title
FROM staging_user_saved_topics sst
JOIN users_id_mapping um ON sst.user = um.old_id
JOIN topics_id_mapping tm ON sst.topic = tm.old_id
JOIN user_theories_id_mapping tm2 ON sst.theory = tm2.old_id;

COMMIT;

-- Migrating user-saved-key-figure
BEGIN;

INSERT INTO user_saved_key_figure (user_id, key_figure_id, theory_id, note, note_title)
SELECT 
    um.new_id AS user_id, 
    pm.new_id AS key_figure_id, 
    tm.new_id AS theory_id, 
    note, 
    note_title
FROM staging_user_saved_key_figure ssf
JOIN users_id_mapping um ON ssf.user = um.old_id
JOIN personnel_id_mapping pm ON ssf.key_figure = pm.old_id
JOIN user_theories_id_mapping tm ON ssf.theory = tm.old_id;

COMMIT;

-- Migrating user-saved-testimonies
BEGIN;

INSERT INTO user_saved_testimonies (user_id, testimony_id, theory_id, note, note_title)
SELECT 
    um.new_id AS user_id, 
    tm.new_id AS testimony_id, 
    tm2.new_id AS theory_id, 
    note, 
    note_title
FROM staging_user_saved_testimonies sst
JOIN users_id_mapping um ON sst.user = um.old_id
JOIN testimonies_id_mapping tm ON sst.testimony = tm.old_id
JOIN user_theories_id_mapping tm2 ON sst.theory = tm2.old_id;

COMMIT;

-- Migrating user-saved-documents
BEGIN;

INSERT INTO user_saved_documents (user_id, document_id, theory_id, note, note_title)
SELECT 
    um.new_id AS user_id, 
    dm.new_id AS document_id, 
    tm.new_id AS theory_id, 
    note, 
    note_title
FROM staging_user_saved_documents ssd
JOIN users_id_mapping um ON ssd.user = um.old_id
JOIN documents_id_mapping dm ON ssd.document = dm.old_id
JOIN user_theories_id_mapping tm ON ssd.theory = tm.old_id;

COMMIT;

-- Migrating user-saved-organizations
BEGIN;

INSERT INTO user_saved_organizations (user_id, organization_id, theory_id, note, note_title)
SELECT 
    um.new_id AS user_id, 
    om.new_id AS organization_id, 
    tm.new_id AS theory_id, 
    note, 
    note_title
FROM staging_user_saved_organizations sso
JOIN users_id_mapping um ON sso.user = um.old_id
JOIN organizations_id_mapping om ON sso.organization = om.old_id
JOIN user_theories_id_mapping tm ON sso.theory = tm.old_id;

COMMIT;

-- Migrating user-saved-sightings
BEGIN;

INSERT INTO user_saved_sightings (user_id, sighting_id, theory_id, note, note_title)
SELECT 
    um.new_id AS user_id, 
    sm.new_id AS sighting_id, 
    tm.new_id AS theory_id, 
    note, 
    note_title
FROM staging_user_saved_sightings sss
JOIN users_id_mapping um ON sss.user = um.old_id
JOIN sightings_id_mapping sm ON sss.sighting = sm.old_id
JOIN user_theories_id_mapping tm ON sss.theory = tm.old_id;

COMMIT;

-- ====================================================
-- Step 6: Insert into Join Tables (Continued)
-- ====================================================

-- Note: If there are any additional join tables not covered in Step 4, insert them here similarly.
-- ====================================================
-- Step 7: Finalizing the Migration
-- ====================================================

-- Clean Up: Drop staging tables
DROP TABLE IF EXISTS staging_users;
DROP TABLE IF EXISTS staging_personnel;
DROP TABLE IF EXISTS staging_organizations;
DROP TABLE IF EXISTS staging_topics;
DROP TABLE IF EXISTS staging_events;
DROP TABLE IF EXISTS staging_sightings;
DROP TABLE IF EXISTS staging_event_subject_matter_experts;
DROP TABLE IF EXISTS staging_topic_subject_matter_experts;
DROP TABLE IF EXISTS staging_organization_members;
DROP TABLE IF EXISTS staging_testimonies;
DROP TABLE IF EXISTS staging_topics_testimonies;
DROP TABLE IF EXISTS staging_documents;
DROP TABLE IF EXISTS staging_locations;
DROP TABLE IF EXISTS staging_event_topic_subject_matter_experts;
DROP TABLE IF EXISTS staging_user_saved_events;
DROP TABLE IF EXISTS staging_user_saved_topics;
DROP TABLE IF EXISTS staging_user_saved_key_figure;
DROP TABLE IF EXISTS staging_user_saved_testimonies;
DROP TABLE IF EXISTS staging_user_saved_documents;
DROP TABLE IF EXISTS staging_user_saved_organizations;
DROP TABLE IF EXISTS staging_user_saved_sightings;
DROP TABLE IF EXISTS staging_mindmaps;
DROP TABLE IF EXISTS staging_artifacts;
DROP TABLE IF EXISTS staging_tags;
DROP TABLE IF EXISTS staging_theories;

-- Drop temporary mapping tables if necessary
DROP TABLE IF EXISTS temp_users_mapping;
DROP TABLE IF EXISTS temp_personnel_mapping;
DROP TABLE IF EXISTS temp_organizations_mapping;
DROP TABLE IF EXISTS temp_topics_mapping;
DROP TABLE IF EXISTS temp_events_mapping;
DROP TABLE IF EXISTS temp_sightings_mapping;
DROP TABLE IF EXISTS temp_tags_mapping;
DROP TABLE IF EXISTS temp_theories_mapping;
DROP TABLE IF EXISTS temp_mindmaps_mapping;
DROP TABLE IF EXISTS temp_artifacts_mapping;
-- Add additional TEMP tables as necessary

-- ====================================================
-- Step 8: Validate the Migration
-- ====================================================

-- Example Validation Queries

-- 1. Verify row counts for users
SELECT 
    (SELECT COUNT(*) FROM staging_users) AS staging_users_count,
    (SELECT COUNT(*) FROM users) AS postgres_users_count;

-- 2. Verify row counts for personnel
SELECT 
    (SELECT COUNT(*) FROM staging_personnel) AS staging_personnel_count,
    (SELECT COUNT(*) FROM personnel) AS postgres_personnel_count;

-- 3. Verify foreign key mappings in documents
SELECT 
    d.id AS document_id, 
    d.author_id, 
    p.id AS personnel_id
FROM documents d
LEFT JOIN personnel p ON d.author_id = p.id
WHERE p.id IS NULL; -- Should return zero rows

-- 4. Verify foreign key mappings in testimonies
SELECT 
    t.id AS testimony_id, 
    t.event_id, 
    e.id AS event_id, 
    t.witness_id, 
    p.id AS witness_id,
    t.organization_id,
    o.id AS organization_id
FROM testimonies t
LEFT JOIN events e ON t.event_id = e.id
LEFT JOIN personnel p ON t.witness_id = p.id
LEFT JOIN organizations o ON t.organization_id = o.id
WHERE e.id IS NULL OR p.id IS NULL OR o.id IS NULL; -- Should return zero rows

-- 5. Spot-check a specific user
SELECT * FROM users WHERE email = 'user@example.com';

-- 6. Check unique constraints
SELECT email, COUNT(*)
FROM users
GROUP BY email
HAVING COUNT(*) > 1; -- Should return zero rows

-- 7. Validate foreign key references in user-saved-events
SELECT 
    use.id, 
    use.user_id, 
    use.event_id, 
    use.theory_id
FROM user_saved_events use
LEFT JOIN users u ON use.user_id = u.id
LEFT JOIN events e ON use.event_id = e.id
LEFT JOIN user_theories ut ON use.theory_id = ut.id
WHERE u.id IS NULL OR e.id IS NULL OR ut.id IS NULL; -- Should return zero rows

-- Add additional validation queries as needed

-- ====================================================
-- Step 9: Recreate Indexes and Constraints (If Not Already Created)
-- ====================================================

-- Example: Adding unique constraint on users.email
ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);

-- Example: Creating indexes on foreign key columns
CREATE INDEX idx_documents_author_id ON documents(author_id);
CREATE INDEX idx_documents_organization_id ON documents(organization_id);
CREATE INDEX idx_testimonies_event_id ON testimonies(event_id);
CREATE INDEX idx_testimonies_witness_id ON testimonies(witness_id);
CREATE INDEX idx_testimonies_organization_id ON testimonies(organization_id);
CREATE INDEX idx_user_saved_events_user_id ON user_saved_events(user_id);
CREATE INDEX idx_user_saved_events_event_id ON user_saved_events(event_id);
CREATE INDEX idx_user_saved_events_theory_id ON user_saved_events(theory_id);
CREATE INDEX idx_user_saved_topics_user_id ON user_saved_topics(user_id);
CREATE INDEX idx_user_saved_topics_topic_id ON user_saved_topics(topic_id);
CREATE INDEX idx_user_saved_topics_theory_id ON user_saved_topics(theory_id);
CREATE INDEX idx_user_saved_key_figure_user_id ON user_saved_key_figure(user_id);
CREATE INDEX idx_user_saved_key_figure_key_figure_id ON user_saved_key_figure(key_figure_id);
CREATE INDEX idx_user_saved_key_figure_theory_id ON user_saved_key_figure(theory_id);
CREATE INDEX idx_user_saved_testimonies_user_id ON user_saved_testimonies(user_id);
CREATE INDEX idx_user_saved_testimonies_testimony_id ON user_saved_testimonies(testimony_id);
CREATE INDEX idx_user_saved_testimonies_theory_id ON user_saved_testimonies(theory_id);
CREATE INDEX idx_user_saved_documents_user_id ON user_saved_documents(user_id);
CREATE INDEX idx_user_saved_documents_document_id ON user_saved_documents(document_id);
CREATE INDEX idx_user_saved_documents_theory_id ON user_saved_documents(theory_id);
CREATE INDEX idx_user_saved_organizations_user_id ON user_saved_organizations(user_id);
CREATE INDEX idx_user_saved_organizations_organization_id ON user_saved_organizations(organization_id);
CREATE INDEX idx_user_saved_organizations_theory_id ON user_saved_organizations(theory_id);
CREATE INDEX idx_user_saved_sightings_user_id ON user_saved_sightings(user_id);
CREATE INDEX idx_user_saved_sightings_sighting_id ON user_saved_sightings(sighting_id);
CREATE INDEX idx_user_saved_sightings_theory_id ON user_saved_sightings(theory_id);
CREATE INDEX idx_mindmaps_user_id ON mindmaps(user_id);
CREATE INDEX idx_event_subject_matter_experts_event_id ON event_subject_matter_experts(event_id);
CREATE INDEX idx_event_subject_matter_experts_subject_matter_expert_id ON event_subject_matter_experts(subject_matter_expert_id);
CREATE INDEX idx_topic_subject_matter_experts_topic_id ON topic_subject_matter_experts(topic_id);
CREATE INDEX idx_topic_subject_matter_experts_subject_matter_expert_id ON topic_subject_matter_experts(subject_matter_expert_id);
CREATE INDEX idx_organization_members_member_id ON organization_members(member_id);
CREATE INDEX idx_organization_members_organization_id ON organization_members(organization_id);
CREATE INDEX idx_topics_testimonies_topic_id ON topics_testimonies(topic_id);
CREATE INDEX idx_topics_testimonies_testimony_id ON topics_testimonies(testimony_id);
CREATE INDEX idx_event_topic_subject_matter_experts_event_id ON event_topic_subject_matter_experts(event_id);
CREATE INDEX idx_event_topic_subject_matter_experts_topic_id ON event_topic_subject_matter_experts(topic_id);
CREATE INDEX idx_event_topic_subject_matter_experts_subject_matter_expert_id ON event_topic_subject_matter_experts(subject_matter_expert_id);
-- Continue creating necessary indexes for other tables...

-- ====================================================
-- Migration Complete
-- ====================================================