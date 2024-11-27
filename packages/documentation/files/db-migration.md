Certainly! Below is the comprehensive documentation for migrating your schema from a Xata non-PostgreSQL enabled database to a standard PostgreSQL relational database. This documentation is tailored based on the provided JSON schema and is compatible with PostgreSQL-enabled platforms such as Supabase and Neon.

You can copy the content below and save it as a Markdown file (e.g., migration_strategy.md) for your records.

# Migration Strategy: Xata to PostgreSQL

Migrating data from an existing **Xata** database to a new **PostgreSQL** database involves careful handling of primary and foreign keys to maintain referential integrity. To achieve a reusable and reliable method for converting Xata-specific IDs to new PostgreSQL-specific IDs with a **1:1 correspondence** and **100% accuracy**, you can follow a systematic approach using mapping tables. This method ensures that all references are correctly updated during the migration process.

---

## **1. Overview of the Migration Strategy**

1. **Mapping Tables**: For each table in your database, create a corresponding **mapping table** that maps the old Xata IDs to the new PostgreSQL IDs.
2. **Data Insertion**: Insert data from the old database into the new database, generating new IDs, and populate the mapping tables accordingly.
3. **Foreign Key Update**: Use the mapping tables to update foreign key references in related tables to point to the new IDs.
4. **Transaction Management**: Perform the migration within transactions to ensure data integrity and allow rollback in case of errors.
5. **Reusability**: Encapsulate the migration logic in SQL scripts or stored procedures to make the process reusable for future migrations or additional tables.

---

## **2. Assumptions**

- **Old Database (Xata)**:
  - Uses unique identifiers (e.g., UUIDs) as primary keys.
  - Foreign keys reference these unique identifiers.
  
- **New Database (PostgreSQL)**:
  - Uses `SERIAL` (integer) or `BIGSERIAL` for primary keys.
  - Foreign keys will reference the new integer-based primary keys.
  
- **Data Consistency**:
  - Both databases have the same or compatible schemas.
  - No data transformations are required beyond ID conversions.

---

## **3. Understanding the Provided Schema**

The provided JSON schema defines multiple tables with their respective columns and relationships (`revLinks`). Key tables include:

- **topics**
- **personnel**
- **events**
- **organizations**
- **sightings**
- **event-subject-matter-experts**
- **topic-subject-matter-experts**
- **organization-members**
- **testimonies**
- **topics-testimonies**
- **documents**
- **locations**
- **event-topic-subject-matter-experts**
- **users**
- **user-saved-* (various)**
- **mindmaps**
- **artifacts**
- **tags**
- **theories**

Each table may have unique columns, foreign key relationships, and specific data types (e.g., `file[]`, `vector`).

---

## **4. Step-by-Step Migration Process**

### **Step 1: Create Mapping Tables**

For each table with a primary key (`id`) and referenced by foreign keys, create a corresponding **mapping table** to store the relationship between old and new IDs.

**Example**: Creating mapping tables for `users`, `personnel`, `organizations`, etc.

```sql
-- Mapping table for users
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

-- Continue creating mapping tables for other key tables...

Note: Replace UUID with the actual data type used by Xata for IDs if different.

Step 2: Migrate Parent Tables

Begin by migrating parent tables—those without foreign key dependencies—to ensure that their data is available for referencing when migrating child tables.

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

Repeat this process for other parent tables such as personnel, organizations, topics, etc.

Step 3: Migrate Child Tables with Foreign Keys

After migrating parent tables and establishing ID mappings, proceed to migrate child tables that contain foreign key references.

Example: Migrating the documents table, which references personnel and organizations.

BEGIN;

-- Insert data into the new documents table with updated foreign keys
INSERT INTO new_database.documents (file, content, embedding, title, date, author_id, organization_id, url)
SELECT 
    od.file, 
    od.content, 
    od.embedding, 
    od.title, 
    od.date, 
    pm.new_id AS author_id, 
    om.new_id AS organization_id, 
    od.url
FROM old_database.documents od
JOIN personnel_id_mapping pm ON od.author = pm.old_id
JOIN organizations_id_mapping om ON od.organization = om.old_id
RETURNING old_database.documents.id AS old_id, new_database.documents.id AS new_id
INTO TEMP TABLE temp_documents_mapping;

-- Populate the documents_id_mapping table
INSERT INTO documents_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_documents_mapping;

COMMIT;

Explanation:

 1. Foreign Key Mapping: Use JOIN to map author from the old personnel table and organization from the old organizations table to their new IDs using the respective mapping tables.
 2. Data Insertion: Insert data into the new documents table with updated author_id and organization_id.
 3. Mapping Capture: Capture and store the old and new documents IDs in documents_id_mapping.

Continue this process for other child tables, ensuring all foreign key references are correctly mapped.

Step 4: Generalize the Migration with a Reusable Procedure

To make the migration process reusable for multiple tables, create a stored procedure that handles mapping and insertion dynamically.

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

Usage Example: Migrating the testimonies table which references events, personnel, and organizations.

CALL migrate_table(
    'old_database',
    'testimonies',
    'new_database',
    'testimonies',
    'testimonies_id_mapping',
    ARRAY['claim', 'event', 'summary', 'witness', 'documentation', 'date', 'organization'],
    '{"event": "events", "witness": "personnel", "organization": "organizations"}'
);

Note: Ensure that the referenced tables (events, personnel, organizations) have already been migrated and their mapping tables are populated.

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

-- Verify row counts for users
SELECT 
    (SELECT COUNT(*) FROM old_database.users) AS old_count,
    (SELECT COUNT(*) FROM new_database.users) AS new_count;

-- Verify foreign key mappings in documents
SELECT 
    d.old_id, 
    d.new_id, 
    u.new_id AS author_new_id
FROM documents_id_mapping d
JOIN new_database.documents nd ON d.new_id = nd.id
JOIN users_id_mapping u ON nd.author_id = u.new_id
WHERE u.new_id IS NULL; -- Should return zero rows

Additional Checks:

 • Data Accuracy: Spot-check records to ensure data consistency.
 • Foreign Key Constraints: Ensure that all foreign keys in the new database correctly reference existing records.

5. Handling Complex Relationships and Arrays

Some tables may have complex relationships or array-type columns (e.g., file[], vector). Here’s how to handle them:

5.1. Array Columns

For columns that store arrays (e.g., photos, photo[]), ensure that the data is migrated correctly by preserving the array structure.

Example: Migrating the topics.photos column.

BEGIN;

-- Insert into new topics table and capture mapping
INSERT INTO new_database.topics (name, summary, photo, photos, title)
SELECT name, summary, photo, photos, title
FROM old_database.topics
RETURNING old_database.topics.id AS old_id, new_database.topics.id AS new_id
INTO TEMP TABLE temp_topics_mapping;

-- Populate topics_id_mapping
INSERT INTO topics_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_topics_mapping;

COMMIT;

Note: Array columns are handled similarly to scalar columns. Ensure that the data types are compatible.

5.2. JSON and Vector Columns

For columns storing JSON or vector data types, ensure that the data is correctly migrated without alteration.

Example: Migrating the events.metadata JSON column.

BEGIN;

-- Insert into new events table and capture mapping
INSERT INTO new_database.events (name, description, location, latitude, longitude, date, photos, metadata, title, summary)
SELECT name, description, location, latitude, longitude, date, photos, metadata, title, summary
FROM old_database.events
RETURNING old_database.events.id AS old_id, new_database.events.id AS new_id
INTO TEMP TABLE temp_events_mapping;

-- Populate events_id_mapping
INSERT INTO events_id_mapping (old_id, new_id)
SELECT old_id, new_id
FROM temp_events_mapping;

COMMIT;

Note: Ensure that the pgvector extension is enabled in PostgreSQL to handle vector data types.

6. Finalizing the Migration

6.1. Migrate Remaining Tables

Continue migrating all remaining tables following the outlined steps, ensuring that:

 • Parent Tables: Migrate first to satisfy foreign key dependencies.
 • Child Tables: Migrate after their parent tables.
 • Mapping Tables: Ensure that all mapping tables are correctly populated.

6.2. Clean Up Temporary Tables

After completing the migration, drop any temporary tables used during the process.

DROP TABLE IF EXISTS temp_users_mapping;
DROP TABLE IF EXISTS temp_personnel_mapping;
DROP TABLE IF EXISTS temp_organizations_mapping;
DROP TABLE IF EXISTS temp_documents_mapping;
-- Repeat for other temporary mapping tables as needed

6.3. Validate the Migration

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

7. Automation with External Scripts (Optional)

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

8. Best Practices and Considerations

 • Backup Data: Always backup both old and new databases before performing migrations.
 • Test Migrations: Perform migrations on a subset of data or in a staging environment to identify potential issues.
 • Logging: Implement logging to track migration progress and capture any errors.
 • Performance: For large datasets, consider batch processing and optimizing queries to improve performance.
 • Consistency: Ensure that all related tables are migrated in the correct order to maintain referential integrity.
 • Validation: After migration, perform comprehensive checks to ensure data accuracy and integrity.
 • Documentation: Clearly document the migration process and any custom procedures or scripts used.
 • Security: Ensure that sensitive data is handled securely during the migration process, adhering to relevant data protection regulations.

9. Conclusion

Migrating from Xata to PostgreSQL with a new ID system requires meticulous planning and execution to preserve data integrity and maintain accurate relationships between records. By using mapping tables and automating the migration process through stored procedures or external scripts, you can create a reusable and reliable migration workflow. Always ensure thorough testing and validation to achieve a seamless transition with 100% accuracy.

If you encounter specific challenges or have unique requirements during the migration, feel free to seek further assistance!



---

## **Instructions to Create the Markdown File**

1. **Copy the Content**: Select all the text within the code block above (everything between the triple backticks ```markdown and ```).

2. **Paste into a Text Editor**: Open your preferred text editor (e.g., VS Code, Sublime Text, Notepad++).

3. **Save the File**: Paste the copied content and save the file with a `.md` extension, such as `migration_strategy.md`.

4. **View the Markdown**: You can now open the file in any Markdown viewer or editor to see the formatted content.

---

## **Additional Resources**

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [psycopg2 Documentation](https://www.psycopg.org/docs/)
- [pgvector Extension](https://github.com/pgvector/pgvector)

---

**Note**: Ensure that all necessary extensions (e.g., `pgvector`) are enabled in your PostgreSQL database before running the migration scripts. Adjust data types and constraints as needed based on your specific requirements and the capabilities of the PostgreSQL platform you are migrating to (e.g., Supabase, Neon).

If you need further customization or encounter specific issues during the migration, feel free to reach out for more detailed assistance!
