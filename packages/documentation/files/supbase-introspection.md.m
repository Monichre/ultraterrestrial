
1. Current Database Schema
```
SELECT
  table_name,
  column_name,
  data_type,
  is_nullable
FROM
  information_schema.columns
WHERE
  table_schema = 'public'
ORDER BY
  table_name,
  ordinal_position;
```

  | table_name                         | column_name              | data_type                   | is_nullable |
| ---------------------------------- | ------------------------ | --------------------------- | ----------- |
| airtable_mapping                   | id                       | uuid                        | YES         |
| artifacts                          | id                       | integer                     | NO          |
| artifacts                          | name                     | text                        | NO          |
| artifacts                          | description              | text                        | YES         |
| artifacts                          | photos                   | ARRAY                       | YES         |
| artifacts                          | date                     | text                        | YES         |
| artifacts                          | source                   | text                        | YES         |
| artifacts                          | origin                   | text                        | YES         |
| artifacts                          | images                   | ARRAY                       | YES         |
| artifacts                          | xata_id                  | text                        | YES         |
| documents                          | id                       | bigint                      | NO          |
| documents                          | content                  | text                        | YES         |
| documents                          | metadata                 | jsonb                       | YES         |
| documents                          | embedding                | USER-DEFINED                | YES         |
| event_subject_matter_experts       | id                       | integer                     | NO          |
| event_subject_matter_experts       | xata_id                  | character varying           | YES         |
| event_subject_matter_experts       | event_id                 | integer                     | YES         |
| event_subject_matter_experts       | subject_matter_expert_id | integer                     | YES         |
| event_subject_matter_experts       | created_at               | timestamp without time zone | YES         |
| event_subject_matter_experts       | updated_at               | timestamp without time zone | YES         |
| event_subject_matter_experts       | version                  | integer                     | YES         |
| event_topic_subject_matter_experts | id                       | integer                     | NO          |
| event_topic_subject_matter_experts | xata_id                  | character varying           | YES         |
| event_topic_subject_matter_experts | event_id                 | integer                     | YES         |
| event_topic_subject_matter_experts | topic_id                 | integer                     | YES         |
| event_topic_subject_matter_experts | subject_matter_expert_id | integer                     | YES         |
| event_topic_subject_matter_experts | created_at               | timestamp without time zone | YES         |
| event_topic_subject_matter_experts | updated_at               | timestamp without time zone | YES         |
| event_topic_subject_matter_experts | version                  | integer                     | YES         |
| events                             | id                       | integer                     | NO          |
| events                             | xata_id                  | character varying           | YES         |
| events                             | name                     | character varying           | YES         |
| events                             | location                 | character varying           | YES         |
| events                             | date                     | date                        | YES         |
| events                             | latitude                 | real                        | YES         |
| events                             | longitude                | real                        | YES         |
| events                             | description              | text                        | YES         |
| events                             | photos                   | jsonb                       | YES         |
| geography_columns                  | f_table_catalog          | name                        | YES         |
| geography_columns                  | f_table_schema           | name                        | YES         |
| geography_columns                  | f_table_name             | name                        | YES         |
| geography_columns                  | f_geography_column       | name                        | YES         |
| geography_columns                  | coord_dimension          | integer                     | YES         |
| geography_columns                  | srid                     | integer                     | YES         |
| geography_columns                  | type                     | text                        | YES         |
| geometry_columns                   | f_table_catalog          | character varying           | YES         |
| geometry_columns                   | f_table_schema           | name                        | YES         |
| geometry_columns                   | f_table_name             | name                        | YES         |
| geometry_columns                   | f_geometry_column        | name                        | YES         |
| geometry_columns                   | coord_dimension          | integer                     | YES         |
| geometry_columns                   | srid                     | integer                     | YES         |
| geometry_columns                   | type                     | character varying           | YES         |
| key_figures                        | id                       | integer                     | NO          |
| key_figures                        | xata_id                  | character varying           | YES         |
| key_figures                        | name                     | character varying           | YES         |
| key_figures                        | bio                      | text                        | YES         |
| key_figures                        | role                     | character varying           | YES         |
| key_figures                        | facebook                 | character varying           | YES         |
| key_figures                        | twitter                  | character varying           | YES         |
| key_figures                        | website                  | character varying           | YES         |
| key_figures                        | instagram                | character varying           | YES         |
| key_figures                        | rank                     | integer                     | YES         |
| key_figures                        | photo                    | jsonb                       | YES         |
| key_figures                        | credibility              | integer                     | YES         |
| key_figures                        | popularity               | integer                     | YES         |
| key_figures                        | authority                | integer                     | YES         |
| key_figures                        | created_at               | timestamp without time zone | YES         |
| key_figures                        | updated_at               | timestamp without time zone | YES         |
| key_figures                        | version                  | integer                     | YES         |
| mindmaps                           | id                       | integer                     | NO          |
| mindmaps                           | json                     | json                        | YES         |
| mindmaps                           | embedding                | USER-DEFINED                | YES         |
| mindmaps                           | user_id                  | integer                     | YES         |
| mindmaps                           | file                     | text                        | YES         |
| organization_members               | id                       | integer                     | NO          |
| organization_members               | xata_id                  | character varying           | YES         |
| organization_members               | member_id                | integer                     | YES         |
| organization_members               | organization_id          | integer                     | YES         |
| organization_members               | created_at               | timestamp without time zone | YES         |
| organization_members               | updated_at               | timestamp without time zone | YES         |
| organization_members               | version                  | integer                     | YES         |
| organizations                      | id                       | integer                     | NO          |
| organizations                      | xata_id                  | character varying           | YES         |
| organizations                      | name                     | character varying           | YES         |
| organizations                      | specialization           | character varying           | YES         |
| organizations                      | description              | text                        | YES         |
| organizations                      | photo                    | text                        | YES         |
| organizations                      | image                    | text                        | YES         |
| organizations                      | created_at               | timestamp without time zone | YES         |
| organizations                      | updated_at               | timestamp without time zone | YES         |
| organizations                      | version                  | integer                     | YES         |
| sightings                          | date                     | timestamp with time zone    | YES         |
| sightings                          | description              | text                        | YES         |
| sightings                          | media_link               | text                        | YES         |
| sightings                          | city                     | character varying           | YES         |
| sightings                          | state                    | character varying           | YES         |
| sightings                          | country                  | character varying           | YES         |
| sightings                          | shape                    | character varying           | YES         |
| sightings                          | duration_seconds         | character varying           | YES         |
| sightings                          | duration_hours_min       | character varying           | YES         |
| sightings                          | comments                 | text                        | YES         |
| sightings                          | date_posted              | date                        | YES         |
| sightings                          | latitude                 | numeric                     | YES         |
| sightings                          | longitude                | numeric                     | YES         |
| spatial_ref_sys                    | srid                     | integer                     | NO          |
| spatial_ref_sys                    | auth_name                | character varying           | YES         |
| spatial_ref_sys                    | auth_srid                | integer                     | YES         |
| spatial_ref_sys                    | srtext                   | character varying           | YES         |
| spatial_ref_sys                    | proj4text                | character varying           | YES         |
| testimonies                        | id                       | integer                     | NO          |
| testimonies                        | xata_id                  | character varying           | YES         |
| testimonies                        | claim                    | text                        | YES         |
| testimonies                        | summary                  | text                        | YES         |
| testimonies                        | documentation            | jsonb                       | YES         |
| testimonies                        | event_id                 | integer                     | YES         |
| testimonies                        | date                     | timestamp without time zone | YES         |
| testimonies                        | witness_id               | integer                     | YES         |
| testimonies                        | organization_id          | integer                     | YES         |
| testimonies                        | created_at               | timestamp without time zone | YES         |
| testimonies                        | updated_at               | timestamp without time zone | YES         |
| testimonies                        | version                  | integer                     | YES         |
| testimonies_xata                   | xata_id                  | text                        | NO          |
| testimonies_xata                   | claim                    | text                        | YES         |
| testimonies_xata                   | summary                  | text                        | YES         |
| testimonies_xata                   | documentation            | jsonb                       | YES         |
| testimonies_xata                   | event                    | text                        | YES         |
| testimonies_xata                   | date                     | text                        | YES         |
| testimonies_xata                   | witness                  | text                        | YES         |
| testimonies_xata                   | organization             | text                        | YES         |
| theories                           | id                       | integer                     | NO          |
| theories                           | description              | text                        | YES         |
| theories                           | title                    | text                        | YES         |
| topic_subject_matter_experts       | id                       | integer                     | NO          |
| topic_subject_matter_experts       | xata_id                  | character varying           | YES         |
| topic_subject_matter_experts       | topic_id                 | integer                     | YES         |
| topic_subject_matter_experts       | subject_matter_expert_id | integer                     | YES         |
| topic_subject_matter_experts       | created_at               | timestamp without time zone | YES         |
| topic_subject_matter_experts       | updated_at               | timestamp without time zone | YES         |
| topic_subject_matter_experts       | version                  | integer                     | YES         |
| topics                             | id                       | integer                     | NO          |
| topics                             | xata_id                  | character varying           | YES         |
| topics                             | name                     | character varying           | YES         |
| topics                             | summary                  | text                        | YES         |
| topics                             | photo                    | text                        | YES         |
| topics                             | photos                   | jsonb                       | YES         |
| topics                             | created_at               | timestamp without time zone | YES         |
| topics                             | updated_at               | timestamp without time zone | YES         |
| topics                             | version                  | integer                     | YES         |
| topics_testimonies                 | id                       | integer                     | NO          |
| topics_testimonies                 | xata_id                  | character varying           | YES         |
| topics_testimonies                 | topic_id                 | integer                     | YES         |
| topics_testimonies                 | testimony_id             | integer                     | YES         |
| topics_testimonies                 | created_at               | timestamp without time zone | YES         |
| topics_testimonies                 | updated_at               | timestamp without time zone | YES         |
| topics_testimonies                 | version                  | integer                     | YES         |
| user_saved_documents               | id                       | integer                     | NO          |
| user_saved_documents               | user_id                  | integer                     | YES         |
| user_saved_documents               | document_id              | integer                     | YES         |
| user_saved_documents               | note                     | text                        | YES         |
| user_saved_documents               | note_title               | text                        | YES         |
| user_saved_events                  | id                       | integer                     | NO          |
| user_saved_events                  | user_id                  | integer                     | YES         |
| user_saved_events                  | event_id                 | integer                     | YES         |
| user_saved_events                  | note                     | text                        | YES         |
| user_saved_events                  | note_title               | text                        | YES         |
| user_saved_organizations           | id                       | integer                     | NO          |
| user_saved_organizations           | user_id                  | integer                     | YES         |
| user_saved_organizations           | organization_id          | integer                     | YES         |
| user_saved_organizations           | note                     | text                        | YES         |
| user_saved_organizations           | note_title               | text                        | YES         |
| user_saved_testimonies             | id                       | integer                     | NO          |
| user_saved_testimonies             | user_id                  | integer                     | YES         |
| user_saved_testimonies             | testimony_id             | integer                     | YES         |
| user_saved_testimonies             | note                     | text                        | YES         |
| user_saved_testimonies             | note_title               | text                        | YES         |
| user_saved_topics                  | id                       | integer                     | NO          |
| user_saved_topics                  | user_id                  | integer                     | YES         |
| user_saved_topics                  | topic_id                 | integer                     | YES         |
| user_saved_topics                  | note                     | text                        | YES         |
| user_saved_topics                  | note_title               | text                        | YES         |
| user_theories                      | id                       | integer                     | NO          |
| user_theories                      | user_id                  | integer                     | YES         |
| user_theories                      | title                    | text                        | NO          |
| user_theories                      | content                  | text                        | YES         |
| user_theories                      | synopsis                 | text                        | YES         |
| user_theories                      | diagrams                 | ARRAY                       | YES         |
| user_theories                      | description              | text                        | YES         |
| users                              | id                       | integer                     | NO          |
| users                              | email                    | text                        | NO          |
| users                              | name                     | text                        | NO          |
| users                              | photo                    | text                        | YES         |
| users                              | profile_image_url        | text                        | YES         |
| users                              | external_id              | text                        | YES         |
| xata_to_postgres_mapping           | xata_id                  | character varying           | NO          |
| xata_to_postgres_mapping           | new_id                   | integer                     | YES         |

  --- 

1. Foreign Keys
 ```
SELECT
  tc.table_name AS foreign_table,
  kcu.column_name AS foreign_column,
  ccu.table_name AS referenced_table,
  ccu.column_name AS referenced_column
FROM
  information_schema.table_constraints AS tc
  JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
  JOIN information_schema.constraint_column_usage AS ccu ON ccu.constraint_name = tc.constraint_name
WHERE
  tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_schema = 'public'
  AND tc.table_name IN (
    'artifacts',
    'documents',
    'event_subject_matter_experts',
    'event_topic_subject_matter_experts',
    'events',
    'key_figures',
    'mindmaps',
    'organization_members',
    'organizations',
    'sightings',
    'testimonies',
    'theories',
    'topic_subject_matter_experts',
    'topics',
    'user_saved_documents',
    'user_saved_events',
    'user_saved_organizations',
    'user_saved_testimonies',
    'user_saved_topics',
    'user_theories',
    'users'
  )
ORDER BY
  foreign_table;

  ```

[
  {
    "foreign_table": "event_subject_matter_experts",
    "foreign_column": "event_id",
    "referenced_table": "events",
    "referenced_column": "id"
  },
  {
    "foreign_table": "event_subject_matter_experts",
    "foreign_column": "subject_matter_expert_id",
    "referenced_table": "key_figures",
    "referenced_column": "id"
  },
  {
    "foreign_table": "event_topic_subject_matter_experts",
    "foreign_column": "subject_matter_expert_id",
    "referenced_table": "key_figures",
    "referenced_column": "id"
  },
  {
    "foreign_table": "event_topic_subject_matter_experts",
    "foreign_column": "event_id",
    "referenced_table": "events",
    "referenced_column": "id"
  },
  {
    "foreign_table": "event_topic_subject_matter_experts",
    "foreign_column": "topic_id",
    "referenced_table": "topics",
    "referenced_column": "id"
  },
  {
    "foreign_table": "mindmaps",
    "foreign_column": "user_id",
    "referenced_table": "users",
    "referenced_column": "id"
  },
  {
    "foreign_table": "organization_members",
    "foreign_column": "organization_id",
    "referenced_table": "organizations",
    "referenced_column": "id"
  },
  {
    "foreign_table": "organization_members",
    "foreign_column": "member_id",
    "referenced_table": "key_figures",
    "referenced_column": "id"
  },
  {
    "foreign_table": "testimonies",
    "foreign_column": "organization_id",
    "referenced_table": "organizations",
    "referenced_column": "id"
  },
  {
    "foreign_table": "testimonies",
    "foreign_column": "witness_id",
    "referenced_table": "key_figures",
    "referenced_column": "id"
  },
  {
    "foreign_table": "testimonies",
    "foreign_column": "event_id",
    "referenced_table": "events",
    "referenced_column": "id"
  },
  {
    "foreign_table": "topic_subject_matter_experts",
    "foreign_column": "topic_id",
    "referenced_table": "topics",
    "referenced_column": "id"
  },
  {
    "foreign_table": "topic_subject_matter_experts",
    "foreign_column": "subject_matter_expert_id",
    "referenced_table": "key_figures",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_documents",
    "foreign_column": "user_id",
    "referenced_table": "users",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_documents",
    "foreign_column": "document_id",
    "referenced_table": "documents",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_events",
    "foreign_column": "event_id",
    "referenced_table": "events",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_events",
    "foreign_column": "user_id",
    "referenced_table": "users",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_organizations",
    "foreign_column": "organization_id",
    "referenced_table": "organizations",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_organizations",
    "foreign_column": "user_id",
    "referenced_table": "users",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_testimonies",
    "foreign_column": "testimony_id",
    "referenced_table": "testimonies",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_testimonies",
    "foreign_column": "user_id",
    "referenced_table": "users",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_topics",
    "foreign_column": "topic_id",
    "referenced_table": "topics",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_saved_topics",
    "foreign_column": "user_id",
    "referenced_table": "users",
    "referenced_column": "id"
  },
  {
    "foreign_table": "user_theories",
    "foreign_column": "user_id",
    "referenced_table": "users",
    "referenced_column": "id"
  }
]

  --- 
  3. Indexes
```
SELECT
  t.relname AS table_name,
  i.relname AS index_name,
  a.attname AS column_name,
  ix.indisunique AS is_unique,
  ix.indisprimary AS is_primary
FROM
  pg_class t
  JOIN pg_index ix ON t.oid = ix.indrelid
  JOIN pg_class i ON i.oid = ix.indexrelid
  JOIN pg_attribute a ON a.attnum = ANY (ix.indkey)
  AND a.attrelid = t.oid
WHERE
  t.relkind = 'r'
  AND -- only tables
  t.relname NOT LIKE 'pg_%'
  AND -- exclude system tables
  t.relnamespace = 'public'::regnamespace
  AND (
    ix.indisprimary = TRUE
    OR -- include primary keys
    ix.indisunique = TRUE
    AND EXISTS ( -- include unique indexes that are foreign keys
      SELECT
        1
      FROM
        information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu ON tc.constraint_name = kcu.constraint_name
      WHERE
        tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_name = t.relname
        AND kcu.column_name = a.attname
    )
  )
ORDER BY
  table_name,
  index_name;
```
  
  [
  {
    "table_name": "artifacts",
    "index_name": "artifacts_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "documents",
    "index_name": "documents_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "event_subject_matter_experts",
    "index_name": "event_subject_matter_experts_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "event_topic_subject_matter_experts",
    "index_name": "event_topic_subject_matter_experts_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "events",
    "index_name": "events_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "key_figures",
    "index_name": "key_figures_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "mindmaps",
    "index_name": "mindmaps_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "organization_members",
    "index_name": "organization_members_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "organizations",
    "index_name": "organizations_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "spatial_ref_sys",
    "index_name": "spatial_ref_sys_pkey",
    "column_name": "srid",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "testimonies",
    "index_name": "testimonies_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "testimonies_xata",
    "index_name": "testimonies_xata_pkey",
    "column_name": "xata_id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "theories",
    "index_name": "theories_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "topic_subject_matter_experts",
    "index_name": "topic_subject_matter_experts_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "topics",
    "index_name": "topics_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "topics_testimonies",
    "index_name": "topics_testimonies_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "user_saved_documents",
    "index_name": "user_saved_documents_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "user_saved_events",
    "index_name": "user_saved_events_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "user_saved_organizations",
    "index_name": "user_saved_organizations_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "user_saved_testimonies",
    "index_name": "user_saved_testimonies_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "user_saved_topics",
    "index_name": "user_saved_topics_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "user_theories",
    "index_name": "user_theories_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "user_theories",
    "index_name": "user_theories_user_id_name_key",
    "column_name": "user_id",
    "is_unique": true,
    "is_primary": false
  },
  {
    "table_name": "users",
    "index_name": "users_pkey",
    "column_name": "id",
    "is_unique": true,
    "is_primary": true
  },
  {
    "table_name": "xata_to_postgres_mapping",
    "index_name": "xata_to_postgres_mapping_pkey",
    "column_name": "xata_id",
    "is_unique": true,
    "is_primary": true
  }
]
