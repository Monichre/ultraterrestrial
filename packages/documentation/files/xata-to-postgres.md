## Database Automation

Certainly! Below is a comprehensive SQL script to implement the provided database schema in PostgreSQL. This script includes:

 1. Extension Setup: Enabling necessary extensions like pgvector for vector data types.
 2. Table Creation: Creating each table with appropriate columns, data types, primary keys, unique constraints, and foreign keys.
 3. Order of Creation: Ensuring tables are created in an order that satisfies foreign key dependencies.

SQL Script to Implement the Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS pgvector;

-- 1. Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    photo TEXT, -- Assuming storing file URLs or paths
    profile_image_url TEXT,
    external_id TEXT
);

-- 2. Personnel Table
CREATE TABLE personnel (
    id SERIAL PRIMARY KEY,
    bio TEXT,
    role TEXT,
    facebook TEXT,
    twitter TEXT,
    website TEXT,
    instagram TEXT,
    photo TEXT[], -- Array of file URLs or paths
    rank INTEGER,
    credibility INTEGER,
    popularity INTEGER,
    name TEXT UNIQUE NOT NULL,
    authority INTEGER
);

-- 3. Organizations Table
CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    specialization TEXT,
    description TEXT,
    photo TEXT,
    image TEXT, -- Assuming storing file URLs or paths
    title TEXT UNIQUE NOT NULL
);

-- 4. Topics Table
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    summary TEXT,
    photo TEXT, -- Assuming storing file URLs or paths
    photos TEXT[], -- Array of file URLs or paths
    title TEXT UNIQUE NOT NULL
);

-- 5. Events Table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    location TEXT,
    latitude FLOAT,
    longitude FLOAT,
    date TIMESTAMP,
    photos TEXT[], -- Array of file URLs or paths
    metadata JSON DEFAULT '{}',
    title TEXT UNIQUE NOT NULL,
    summary TEXT
);

-- 6. Documents Table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    file TEXT[], -- Array of file URLs or paths
    content TEXT,
    embedding VECTOR(1536),
    title TEXT NOT NULL,
    date TIMESTAMP,
    author_id INTEGER REFERENCES personnel(id) ON DELETE SET NULL,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL,
    url TEXT
);

-- 7. Testimonies Table
CREATE TABLE testimonies (
    id SERIAL PRIMARY KEY,
    claim TEXT,
    event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
    summary TEXT,
    witness_id INTEGER REFERENCES personnel(id) ON DELETE SET NULL,
    documentation TEXT[], -- Array of file URLs or paths
    date TIMESTAMP,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL
);

-- 8. Event Subject Matter Experts Table
CREATE TABLE event_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    subject_matter_expert_id INTEGER REFERENCES personnel(id) ON DELETE CASCADE
);

-- 9. Topic Subject Matter Experts Table
CREATE TABLE topic_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    subject_matter_expert_id INTEGER REFERENCES personnel(id) ON DELETE CASCADE
);

-- 10. Organization Members Table
CREATE TABLE organization_members (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES personnel(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE
);

-- 11. Topics Testimonies Table
CREATE TABLE topics_testimonies (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    testimony_id INTEGER REFERENCES testimonies(id) ON DELETE CASCADE
);

-- 12. Event Topic Subject Matter Experts Table
CREATE TABLE event_topic_subject_matter_experts (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    subject_matter_expert_id INTEGER REFERENCES personnel(id) ON DELETE CASCADE
);

-- 13. Sightings Table
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

-- 14. User Theories Table
CREATE TABLE user_theories (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    content TEXT,
    synopsis TEXT,
    diagrams TEXT[], -- Array of file URLs or paths
    UNIQUE(user_id, name)
);

-- 15. User Saved Events Table
CREATE TABLE user_saved_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    theory_id INTEGER REFERENCES user_theories(id) ON DELETE SET NULL,
    note TEXT,
    note_title TEXT
);

-- 16. User Saved Topics Table
CREATE TABLE user_saved_topics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    topic_id INTEGER REFERENCES topics(id) ON DELETE CASCADE,
    theory_id INTEGER REFERENCES user_theories(id) ON DELETE SET NULL,
    note TEXT,
    note_title TEXT
);

-- 17. User Saved Key Figure Table
CREATE TABLE user_saved_key_figure (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    key_figure_id INTEGER REFERENCES personnel(id) ON DELETE CASCADE,
    theory_id INTEGER REFERENCES user_theories(id) ON DELETE SET NULL,
    note TEXT,
    note_title TEXT
);

-- 18. User Saved Testimonies Table
CREATE TABLE user_saved_testimonies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    testimony_id INTEGER REFERENCES testimonies(id) ON DELETE CASCADE,
    theory_id INTEGER REFERENCES user_theories(id) ON DELETE SET NULL,
    note TEXT,
    note_title TEXT
);

-- 19. User Saved Documents Table
CREATE TABLE user_saved_documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    theory_id INTEGER REFERENCES user_theories(id) ON DELETE SET NULL,
    note TEXT,
    note_title TEXT
);

-- 20. User Saved Organizations Table
CREATE TABLE user_saved_organizations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE,
    theory_id INTEGER REFERENCES user_theories(id) ON DELETE SET NULL,
    note TEXT,
    note_title TEXT
);

-- 21. User Saved Sightings Table
CREATE TABLE user_saved_sightings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    sighting_id INTEGER REFERENCES sightings(id) ON DELETE CASCADE,
    theory_id INTEGER REFERENCES user_theories(id) ON DELETE SET NULL,
    note TEXT,
    note_title TEXT
);

-- 22. Mindmaps Table
CREATE TABLE mindmaps (
    id SERIAL PRIMARY KEY,
    json JSON DEFAULT '{}',
    embedding VECTOR(1536),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    file TEXT -- Assuming storing file URLs or paths
);

-- 23. Artifacts Table
CREATE TABLE artifacts (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    photos TEXT[], -- Array of file URLs or paths
    date TEXT,
    source TEXT,
    origin TEXT,
    images TEXT[] -- Array of file URLs or paths
);

-- 24. Tags Table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY
    -- Add columns as needed
);

-- 25. Theories Table
CREATE TABLE theories (
    id SERIAL PRIMARY KEY
    -- Add columns as needed
);

-- Optional: Add indexes for performance optimization
-- Example:
CREATE INDEX idx_documents_author ON documents(author_id);
CREATE INDEX idx_documents_organization ON documents(organization_id);
CREATE INDEX idx_testimonies_event ON testimonies(event_id);
CREATE INDEX idx_testimonies_witness ON testimonies(witness_id);
-- Add more indexes as needed based on query patterns

Explanation of the Script

 1. Extensions:
 • pgvector: This extension is enabled at the beginning to support vector data types used in tables like documents and mindmaps.
 2. Primary Keys:
 • Each table has an id column defined as SERIAL PRIMARY KEY, which auto-increments with each new record.
 3. Unique Constraints:
 • Columns marked as unique in the schema (e.g., users.email, personnel.name, topics.title, etc.) have UNIQUE constraints to enforce uniqueness.
 4. Data Types Mapping:
 • String Types: Mapped to TEXT. If you require a specific length, you can replace TEXT with VARCHAR(n).
 • Text: Mapped to TEXT.
 • File: Assumed to store file URLs or paths as TEXT. Arrays of files (file[]) are stored as TEXT[].
 • Email: Stored as TEXT with a UNIQUE constraint.
 • Datetime: Mapped to TIMESTAMP.
 • Float: Mapped to FLOAT.
 • JSON: Mapped to JSON.
 • Vector: Mapped to VECTOR(dimension) using the pgvector extension.
 • Link: Represented as foreign keys referencing the related table’s id.
 5. Foreign Keys:
 • Foreign key constraints are added to columns that reference other tables. For example, documents.author_id references personnel(id).
 • The ON DELETE behavior is specified to maintain referential integrity:
 • CASCADE: Automatically deletes child records when the parent is deleted.
 • SET NULL: Sets the foreign key to NULL if the parent is deleted.
 6. Handling Reverse Links (revLinks):
 • The revLinks in your schema indicate that other tables reference the current table. These are handled by creating foreign key constraints in the referencing tables.
 • For example, topics has a revLink to topic-subject-matter-experts. This relationship is implemented in the topic_subject_matter_experts table with a foreign key to topics(id).
 7. Additional Tables (tags and theories):
 • These tables are created with minimal columns as they were empty in your provided schema. You can add necessary columns based on your application’s requirements.
 8. Indexes:
 • Indexes are added at the end for performance optimization, especially on foreign key columns that are frequently used in queries. You can add more indexes as needed based on your specific query patterns.
 9. Assumptions:
 • File Storage: The script assumes that files are stored externally (e.g., in cloud storage) and that the database stores the URLs or paths to these files.
 • Missing Columns: For tables like tags and theories, additional columns should be added based on your application’s needs.
 • Default Values: Where defaultValue is specified in the schema (e.g., topics.metadata), appropriate default values are set in the table definitions.
 10. Customization:
 • You can customize the ON DELETE behaviors and add more constraints (e.g., NOT NULL) based on your application’s requirements.
 • If you need to store more complex file metadata or implement file handling logic, consider creating separate tables or using JSON columns to store additional information.

Final Notes

 • Schema Validation: Before running the script, ensure that your PostgreSQL instance has the pgvector extension installed. You can install it using CREATE EXTENSION pgvector; if you have the necessary permissions.
 • Future Enhancements:
 • Triggers and Procedures: Depending on your application’s logic, you might want to add triggers or stored procedures for automated tasks.
 • Security: Implement appropriate security measures, such as role-based access control, to protect sensitive data.
 • Optimization: Analyze query performance and add or adjust indexes as needed.

This script provides a solid foundation for your database schema based on the provided JSON structure. Adjust and expand it as necessary to fit the specific needs of your application.

---

## Migration Strategy for Converting Xata IDs to PostgreSQL IDs

  This section outlines a comprehensive approach to migrating data from an existing Xata database to a new PostgreSQL database. The goal is to ensure a 1:1 correspondence and 100% accuracy in converting Xata-specific IDs to new PostgreSQL-specific IDs while maintaining referential integrity.

  Key Steps:

  1. Mapping Tables: Create mapping tables for each table to map old Xata IDs to new PostgreSQL IDs.
  2. Data Insertion: Insert data into the new database, generating new IDs, and populate the mapping tables.
  3. Foreign Key Update: Update foreign key references using the mapping tables.
  4. Transaction Management: Use transactions to ensure data integrity and allow rollback in case of errors.
  5. Reusability: Encapsulate the migration logic in SQL scripts or stored procedures for future use.

  Assumptions:

- Old Database (Xata) uses unique identifiers (e.g., UUIDs) as primary keys.
- New Database (PostgreSQL) uses SERIAL or BIGSERIAL for primary keys.
- Both databases have compatible schemas.
- No data transformations are required beyond ID conversions.

  Example: Creating mapping tables for users and documents.

<!-- ChatGPT 01 Mini -->
Migrating data from an existing Xata database to a new PostgreSQL database involves careful handling of primary and foreign keys to maintain referential integrity. To achieve a reusable and reliable method for converting Xata-specific IDs to new PostgreSQL-specific IDs with a 1:1 correspondence and 100% accuracy, you can follow a systematic approach using mapping tables. This method ensures that all references are correctly updated during the migration process.

Below is a comprehensive guide to implementing this migration strategy:
packages/data-layer/docs/notes.md
// Start of Selection

- __Overview of the Migration Strategy__

- __Mapping Tables__: For each table in your database, create a corresponding mapping table that maps the old Xata IDs to the new PostgreSQL IDs.

- __Data Insertion__: Insert data from the old database into the new database, generating new IDs, and populate the mapping tables accordingly.

- __Foreign Key Update__: Use the mapping tables to update foreign key references in related tables to point to the new IDs.

- __Transaction Management__: Perform the migration within transactions to ensure data integrity and allow rollback in case of errors.

- __Reusability__: Encapsulate the migration logic in SQL scripts or stored procedures to make the process reusable for future migrations or additional tables.

2. Assumptions

 • Old Database (Xata):
 • Uses unique identifiers (e.g., UUIDs) as primary keys.
 • Foreign keys reference these unique identifiers.
 • New Database (PostgreSQL):
 • Uses SERIAL (integer) or BIGSERIAL for primary keys.
 • Foreign keys will reference the new integer-based primary keys.
 • Data Consistency:
 • Both databases have the same or compatible schemas.
 • No data transformations are required beyond ID conversions.

3. Step-by-Step Migration Process

Step 1: Create Mapping Tables

For each table that has a primary key (id) and is referenced by foreign keys, create a mapping table to store the correspondence between old and new IDs.

Example: For the users and documents tables.

-- Mapping table for users
CREATE TABLE users_id_mapping (
    old_id UUID PRIMARY KEY,   -- Adjust the data type based on Xata's ID type
    new_id SERIAL UNIQUE NOT NULL
);

-- Mapping table for documents
CREATE TABLE documents_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

Note: Adjust the UUID data type if Xata uses a different type for IDs (e.g., TEXT).

Step 2: Insert Data into Parent Tables and Populate Mapping Tables

Start by migrating parent tables (tables without foreign key dependencies) to ensure that foreign key references can be accurately mapped.

Example: Migrating the users table.

BEGIN;

-- Insert data into the new users table and capture the mapping
INSERT INTO new_database.users (email, name, photo, profile_image_url, external_id)
SELECT email, name, photo, profile_image_url, external_id
FROM old_database.users
RETURNING old_database.users.id AS old_id, new_database.users.id AS new_id
INTO TEMP TABLE temp_users_mapping;

-- Populate the users_id_mapping table
INSERT INTO users_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_users_mapping;

COMMIT;

Explanation:

 1. Transaction: Encapsulate operations within a BEGIN; ... COMMIT; block to ensure atomicity.
 2. Data Insertion: Insert data from the old users table into the new users table.
 3. Mapping Capture: Use RETURNING to capture the old and new IDs and store them temporarily.
 4. Populate Mapping Table: Insert the captured mappings into the users_id_mapping table.

Step 3: Migrate Child Tables with Foreign Keys

After migrating the parent tables and establishing the ID mappings, proceed to migrate child tables that contain foreign key references.

Example: Migrating the documents table, which references the users table.

BEGIN;

-- Insert data into the new documents table with updated foreign keys
INSERT INTO new_database.documents (file, content, embedding, title, date, author_id, organization_id, url)
SELECT
    od.file,
    od.content,
    od.embedding,
    od.title,
    od.date,
    um.new_id AS author_id,
    od.organization_id, -- Assume organization_id will also be mapped similarly
    od.url
FROM old_database.documents od
JOIN users_id_mapping um ON od.author_id = um.old_id
-- If organization_id needs mapping, join with its mapping table similarly

RETURNING old_database.documents.id AS old_id, new_database.documents.id AS new_id
INTO TEMP TABLE temp_documents_mapping;

-- Populate the documents_id_mapping table
INSERT INTO documents_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_documents_mapping;

COMMIT;

Explanation:

 1. Foreign Key Mapping: Use JOIN to map author_id from the old users table to the new users table using users_id_mapping.
 2. Data Insertion: Insert data into the new documents table with the updated author_id.
 3. Mapping Capture: Capture and store the old and new documents IDs in documents_id_mapping.

Step 4: Generalize the Migration with a Reusable Procedure

To make the migration process reusable for multiple tables, you can create a stored procedure that handles the mapping and insertion.

Example: Creating a stored procedure for mapping and inserting data.

CREATE OR REPLACE PROCEDURE migrate_table(
    source_schema TEXT,
    source_table TEXT,
    target_schema TEXT,
    target_table TEXT,
    mapping_table TEXT,
    columns TEXT[],
    foreign_keys JSON DEFAULT NULL -- JSON object mapping foreign key columns to their mapping tables
)
LANGUAGE plpgsql
AS $$
DECLARE
    column_list TEXT;
    select_list TEXT;
    join_clauses TEXT := '';
    fk_column TEXT;
    fk_mapping_table TEXT;
    i INTEGER;
BEGIN
    -- Construct the column list for INSERT
    column_list := array_to_string(columns, ', ');

    -- Construct the SELECT list, replacing foreign keys with mapped new_ids
    select_list := '';
    FOR i IN 1..array_length(columns, 1) LOOP
        IF foreign_keys IS NOT NULL AND foreign_keys ? columns[i] THEN
            -- Replace foreign key column with new_id from mapping table
            fk_column := columns[i];
            fk_mapping_table := foreign_keys ->> columns[i];
            select_list := select_list || 'm.' || fk_column || '_new_id AS ' || fk_column || ', ';
        ELSE
            select_list := select_list || 's.' || columns[i] || ', ';
        END IF;
    END LOOP;

    -- Remove trailing comma and space
    select_list := regexp_replace(select_list, ', $', '');

    -- Construct the FROM and JOIN clauses
    IF foreign_keys IS NOT NULL THEN
        FOR fk_column IN SELECT key FROM json_each_text(foreign_keys) LOOP
            join_clauses := join_clauses || 
                ' LEFT JOIN ' || fk_column.key || '_id_mapping m ON s.' || fk_column.key || ' = m.old_id';
        END LOOP;
    END IF;

    -- Execute the dynamic SQL for data insertion
    EXECUTE format('
        WITH mapped AS (
            INSERT INTO %I.%I (%s)
            SELECT %s
            FROM %I.%I s
            %s
            RETURNING s.id AS old_id, %I.%I.id AS new_id
        )
        INSERT INTO %I (old_id, new_id)
        SELECT old_id, new_id FROM mapped;
    ',
    target_schema, target_table,
    column_list,
    select_list,
    source_schema, source_table,
    join_clauses,
    target_schema, target_table,
    mapping_table
    );
END;
$$;

Explanation:

 1. Parameters:
 • source_schema and source_table: The schema and table name in the old database.
 • target_schema and target_table: The schema and table name in the new database.
 • mapping_table: The name of the mapping table for this table.
 • columns: An array of column names to migrate.
 • foreign_keys: A JSON object mapping foreign key columns to their respective mapping tables.
 2. Dynamic SQL Construction:
 • Builds the INSERT statement dynamically based on provided columns and foreign keys.
 • Replaces foreign key columns with their corresponding new IDs from the mapping tables.
 3. Data Insertion and Mapping:
 • Inserts data into the target table.
 • Captures the old and new IDs and inserts them into the mapping table.

Usage Example: Migrating the events table which references the users and organizations tables.

CALL migrate_table(
    'old_database',
    'events',
    'new_database',
    'events',
    'events_id_mapping',
    ARRAY['name', 'description', 'location', 'latitude', 'longitude', 'date', 'photos', 'metadata', 'title', 'summary', 'author_id'],
    '{"author_id": "users", "organization_id": "organizations"}'
);

Note: Adjust the columns array and foreign_keys JSON based on your actual table structure and foreign key relationships.

Step 5: Handle Multiple Tables and Dependencies

Repeat the migration process for all tables, ensuring that parent tables are migrated before child tables to satisfy foreign key dependencies.

Migration Order Example:

 1. Users (Parent)
 2. Personnel (Parent)
 3. Organizations (Parent)
 4. Topics (Parent)
 5. Events (Child of Users and Organizations)
 6. Documents (Child of Personnel and Organizations)
 7. Testimonies (Child of Events, Personnel, Organizations)
 8. Subject Matter Experts Tables (Children of Events, Topics, Personnel)
 9. User-Saved Tables (Children of Users, various other tables)
 10. Others (e.g., sightings, mindmaps, artifacts, etc.)

Tip: Maintain a dependency graph to determine the correct order of migration.

Step 6: Verify Data Integrity

After migrating each table, perform verification to ensure that:

 • Row Counts: The number of rows in each table matches between the old and new databases.
 • Foreign Keys: All foreign key references are correctly mapped and valid.
 • Unique Constraints: Unique constraints are maintained as per the original schema.

Example Verification Queries:

-- Verify row counts
SELECT
    (SELECT COUNT(*) FROM old_database.users) AS old_count,
    (SELECT COUNT(*) FROM new_database.users) AS new_count;

-- Verify foreign key mappings
SELECT
    od.id AS old_document_id,
    nd.id AS new_document_id,
    um.new_id AS new_author_id
FROM old_database.documents od
JOIN documents_id_mapping dm ON od.id = dm.old_id
JOIN new_database.documents nd ON dm.new_id = nd.id
JOIN users_id_mapping um ON od.author_id = um.old_id
WHERE nd.author_id != um.new_id; -- Should return zero rows

4. Complete SQL Example for Key Tables

Below is a more detailed SQL example covering key tables such as users, personnel, organizations, and documents. Adjust the data types and columns based on your specific schema.

4.1. Create Mapping Tables

-- Users Mapping Table
CREATE TABLE users_id_mapping (
    old_id UUID PRIMARY KEY,    -- Replace UUID with actual old ID type
    new_id SERIAL UNIQUE NOT NULL
);

-- Personnel Mapping Table
CREATE TABLE personnel_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Organizations Mapping Table
CREATE TABLE organizations_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

-- Documents Mapping Table
CREATE TABLE documents_id_mapping (
    old_id UUID PRIMARY KEY,
    new_id SERIAL UNIQUE NOT NULL
);

4.2. Migrate Users Table

BEGIN;

-- Insert into new users table and capture mapping
INSERT INTO new_database.users (email, name, photo, profile_image_url, external_id)
SELECT email, name, photo, profile_image_url, external_id
FROM old_database.users
RETURNING id, old_database.users.id AS old_id
INTO TEMP TABLE temp_users_mapping;

-- Populate users_id_mapping
INSERT INTO users_id_mapping (old_id, new_id)
SELECT old_id, id
FROM temp_users_mapping;

COMMIT;

4.3. Migrate Personnel Table

BEGIN;

-- Insert into new personnel table and capture mapping
INSERT INTO new_database.personnel (bio, role, facebook, twitter, website, instagram, photo, rank, credibility, popularity, name, authority)
SELECT bio, role, facebook, twitter, website, instagram, photo, rank, credibility, popularity, name, authority
FROM old_database.personnel
RETURNING id, old_database.personnel.id AS old_id
INTO TEMP TABLE temp_personnel_mapping;

-- Populate personnel_id_mapping
INSERT INTO personnel_id_mapping (old_id, new_id)
SELECT old_id, id
FROM temp_personnel_mapping;

COMMIT;

4.4. Migrate Organizations Table

BEGIN;

-- Insert into new organizations table and capture mapping
INSERT INTO new_database.organizations (name, specialization, description, photo, image, title)
SELECT name, specialization, description, photo, image, title
FROM old_database.organizations
RETURNING id, old_database.organizations.id AS old_id
INTO TEMP TABLE temp_organizations_mapping;

-- Populate organizations_id_mapping
INSERT INTO organizations_id_mapping (old_id, new_id)
SELECT old_id, id
FROM temp_organizations_mapping;

COMMIT;

4.5. Migrate Documents Table with Foreign Keys

BEGIN;

-- Insert into new documents table with updated foreign keys and capture mapping
INSERT INTO new_database.documents (file, content, embedding, title, date, author_id, organization_id, url)
SELECT
    od.file,
    od.content,
    od.embedding,
    od.title,
    od.date,
    um.new_id AS author_id,
    om.new_id AS organization_id,
    od.url
FROM old_database.documents od
JOIN personnel_id_mapping um ON od.author_id = um.old_id
JOIN organizations_id_mapping om ON od.organization_id = om.old_id
RETURNING id, old_database.documents.id AS old_id
INTO TEMP TABLE temp_documents_mapping;

-- Populate documents_id_mapping
INSERT INTO documents_id_mapping (old_id, new_id)
SELECT old_id, id
FROM temp_documents_mapping;

COMMIT;

Explanation:

 1. Foreign Key Resolution: When migrating documents, the author_id and organization_id are mapped using their respective mapping tables (personnel_id_mapping and organizations_id_mapping).
 2. Data Insertion: The new documents records have author_id and organization_id set to the new IDs.
 3. Mapping Capture: The old and new documents IDs are stored in documents_id_mapping.

5. Automating the Migration Process

To enhance reusability and reduce manual effort, consider automating the migration process using scripts or stored procedures. Here’s an example using a PL/pgSQL stored procedure that can handle multiple tables with configurable parameters.

5.1. Stored Procedure for Migration

CREATE OR REPLACE PROCEDURE migrate_table_with_mapping(
    source_schema TEXT,
    source_table TEXT,
    target_schema TEXT,
    target_table TEXT,
    mapping_table TEXT,
    columns TEXT[],
    foreign_key_mappings JSONB DEFAULT '{}'::JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
    column_list TEXT;
    select_list TEXT := '';
    join_clauses TEXT := '';
    fk_column TEXT;
    fk_mapping_table TEXT;
    rec RECORD;
BEGIN
    -- Construct column list for INSERT
    column_list := array_to_string(columns, ', ');

    -- Construct SELECT list with foreign key mappings
    FOREACH fk_column IN ARRAY keys(foreign_key_mappings)
    LOOP
        select_list := select_list || format('m_%I.new_id AS %I, ', fk_column, fk_column);
        join_clauses := join_clauses || format('LEFT JOIN %I_id_mapping m_%I ON s.%I = m_%I.old_id ',
            fk_column, fk_column, fk_column, fk_column);
    END LOOP;

    -- Add non-foreign key columns to SELECT list
    FOR rec IN SELECT * FROM unnest(columns) AS c(col) WHERE c.col NOT IN (SELECT key FROM jsonb_each_text(foreign_key_mappings))
    LOOP
        select_list := select_list || format('s.%I, ', rec.col);
    END LOOP;

    -- Remove trailing comma and space
    select_list := regexp_replace(select_list, ', $', '');

    -- Begin Transaction
    BEGIN
        EXECUTE format('BEGIN');

        -- Insert into target table and capture mapping
        EXECUTE format('
            INSERT INTO %I.%I (%s)
            SELECT %s
            FROM %I.%I s
            %s
            RETURNING s.id AS old_id, %I.%I.id AS new_id
            INTO TEMP TABLE temp_mapping
        ',
            target_schema, target_table,
            column_list,
            select_list,
            source_schema, source_table,
            join_clauses,
            target_schema, target_table
        );

        -- Populate the mapping table
        EXECUTE format('
            INSERT INTO %I (old_id, new_id)
            SELECT old_id, new_id FROM temp_mapping
        ', mapping_table);

        EXECUTE format('COMMIT');
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error migrating table %, rolling back.', target_table;
        EXECUTE format('ROLLBACK');
        RAISE;
    END;
END;
$$;

Explanation:

 1. Parameters:
 • source_schema, source_table: Source table details.
 • target_schema, target_table: Target table details.
 • mapping_table: Mapping table name.
 • columns: Array of column names to migrate.
 • foreign_key_mappings: JSONB object where keys are foreign key columns and values are the referenced tables.
 2. Dynamic SQL:
 • Constructs the INSERT statement dynamically, handling foreign key mappings.
 • Joins with the appropriate mapping tables to replace old foreign keys with new ones.
 3. Error Handling:
 • Encapsulates operations within a transaction.
 • Rolls back in case of any errors, ensuring data integrity.

5.2. Usage Example

Migrating the testimonies Table

Assuming testimonies has foreign keys to events, personnel, and organizations.

CALL migrate_table_with_mapping(
    'old_database',
    'testimonies',
    'new_database',
    'testimonies',
    'testimonies_id_mapping',
    ARRAY['claim', 'event_id', 'summary', 'witness_id', 'documentation', 'date', 'organization_id'],
    '{"event_id": "events", "witness_id": "personnel", "organization_id": "organizations"}'
);

Explanation:

 • Columns: All columns to migrate from testimonies.
 • Foreign Keys:
 • event_id references events.
 • witness_id references personnel.
 • organization_id references organizations.

Note: Ensure that the referenced tables (events, personnel, organizations) have already been migrated and their mapping tables are populated.

6. Handling Complex Relationships and Arrays

Some tables may have complex relationships or array-type columns (e.g., file[], file[] columns). Here’s how to handle them:

6.1. Array Columns

For columns that store arrays (e.g., photo TEXT[]), ensure that the data is migrated correctly by preserving the array structure.

Example: Migrating the personnel.photo column.

BEGIN;

-- Insert into new personnel table and capture mapping
INSERT INTO new_database.personnel (bio, role, facebook, twitter, website, instagram, photo, rank, credibility, popularity, name, authority)
SELECT bio, role, facebook, twitter, website, instagram, photo, rank, credibility, popularity, name, authority
FROM old_database.personnel
RETURNING id, old_database.personnel.id AS old_id
INTO TEMP TABLE temp_personnel_mapping;

-- Populate personnel_id_mapping
INSERT INTO personnel_id_mapping (old_id, new_id)
SELECT old_id, id
FROM temp_personnel_mapping;

COMMIT;

Note: Array columns are handled similarly to scalar columns. Ensure that the data types are compatible.

6.2. JSON and Vector Columns

For columns storing JSON or vector data types, ensure that the data is correctly migrated without alteration.

Example: Migrating the events.metadata JSON column.

BEGIN;

-- Insert into new events table and capture mapping
INSERT INTO new_database.events (name, description, location, latitude, longitude, date, photos, metadata, title, summary)
SELECT name, description, location, latitude, longitude, date, photos, metadata, title, summary
FROM old_database.events
RETURNING id, old_database.events.id AS old_id
INTO TEMP TABLE temp_events_mapping;

-- Populate events_id_mapping
INSERT INTO events_id_mapping (old_id, new_id)
SELECT old_id, id
FROM temp_events_mapping;

COMMIT;

Note: Ensure that the pgvector extension is enabled in PostgreSQL to handle vector data types.

7. Finalizing the Migration

7.1. Migrate Remaining Tables

Continue migrating all remaining tables following the outlined steps, ensuring that:

 • Parent Tables: Migrate first to satisfy foreign key dependencies.
 • Child Tables: Migrate after their parent tables.
 • Mapping Tables: Ensure that all mapping tables are correctly populated.

7.2. Clean Up Temporary Tables

After completing the migration, drop any temporary tables used during the process.

DROP TABLE IF EXISTS temp_users_mapping;
DROP TABLE IF EXISTS temp_personnel_mapping;
DROP TABLE IF EXISTS temp_organizations_mapping;
DROP TABLE IF EXISTS temp_documents_mapping;
-- Repeat for other temporary mapping tables as needed

7.3. Validate the Migration

Perform thorough validation to ensure data integrity:

 • Row Counts: Verify that the number of rows matches between old and new tables.
 • Foreign Keys: Check that all foreign key references are correctly mapped.
 • Data Accuracy: Spot-check records to ensure data consistency.

Example Validation Queries:

-- Validate row counts for users
SELECT
    (SELECT COUNT(*) FROM old_database.users) AS old_count,
    (SELECT COUNT(*) FROM new_database.users) AS new_count;

-- Validate foreign key references in documents
SELECT
    d.old_id,
    d.new_id,
    u.new_id AS author_new_id
FROM documents_id_mapping d
JOIN new_database.documents nd ON d.new_id = nd.id
JOIN users_id_mapping u ON nd.author_id = u.new_id
WHERE u.new_id IS NULL; -- Should return zero rows

7.4. Indexes and Constraints

Recreate any necessary indexes and constraints in the new database to optimize performance and maintain data integrity.

Example:

-- Create indexes on foreign key columns
CREATE INDEX idx_documents_author_id ON new_database.documents(author_id);
CREATE INDEX idx_documents_organization_id ON new_database.documents(organization_id);
-- Repeat for other tables as needed

8. Automation with External Scripts (Optional)

While the above method uses SQL and stored procedures, you can further automate the migration process using external scripts (e.g., Python, Node.js). This approach can handle more complex logic, logging, error handling, and provide better flexibility.

Example: Using Python with psycopg2

import psycopg2
from psycopg2.extras import execute_values

def migrate_table(source_conn, target_conn, source_table, target_table, mapping_table, columns, foreign_keys):
    with source_conn.cursor() as src_cur, target_conn.cursor() as tgt_cur:
        # Fetch data from source table
        src_cur.execute(f"SELECT {', '.join(columns)} FROM {source_table}")
        rows = src_cur.fetchall()

        # Prepare insert statement for target table
        placeholders = ', '.join(['%s'] * len(columns))
        insert_query = f"INSERT INTO {target_table} ({', '.join(columns)}) VALUES ({placeholders}) RETURNING id"

        # Insert data and capture new IDs
        execute_values(tgt_cur, insert_query, rows)
        new_ids = tgt_cur.fetchall()

        # Create mapping entries
        mapping = list(zip([row[0] for row in rows], [nid[0] for nid in new_ids]))
        execute_values(tgt_cur, f"INSERT INTO {mapping_table} (old_id, new_id) VALUES %s", mapping)

    target_conn.commit()

# Usage
source_conn = psycopg2.connect("dbname=old_db user=old_user password=old_pass")
target_conn = psycopg2.connect("dbname=new_db user=new_user password=new_pass")

migrate_table(
    source_conn,
    target_conn,
    'users',
    'new_database.users',
    'users_id_mapping',
    ['id', 'email', 'name', 'photo', 'profile_image_url', 'external_id'],
    {}
)

source_conn.close()
target_conn.close()

Note: This is a simplified example. In practice, you’d need to handle foreign keys, transactions, error handling, and more.

9. Best Practices and Considerations

 • Backup Data: Always backup both old and new databases before performing migrations.
 • Test Migrations: Perform migrations on a subset of data or in a staging environment to identify potential issues.
 • Logging: Implement logging to track migration progress and capture any errors.
 • Performance: For large datasets, consider batch processing and optimizing queries to improve performance.
 • Consistency: Ensure that all related tables are migrated in the correct order to maintain referential integrity.
 • Validation: After migration, perform comprehensive checks to ensure data accuracy and integrity.

10. Conclusion

Migrating from Xata to PostgreSQL with a new ID system requires meticulous planning and execution to preserve data integrity and maintain accurate relationships between records. By using mapping tables and automating the migration process through stored procedures or external scripts, you can create a reusable and reliable migration workflow. Always ensure thorough testing and validation to achieve a seamless transition with 100% accuracy.

If you encounter specific challenges or have unique requirements during the migration, feel free to ask for more tailored assistance!