create foreign table airtable_mapping
    (
        id uuid
        )
    server airtablecms_server
    options (base_id 'appaEXF4ueJAHDjcX', table_id 'Supabase Mapping', schema 'public');

alter foreign table airtable_mapping
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on airtable_mapping to anon;

grant delete, insert, references, select, trigger, truncate, update on airtable_mapping to authenticated;

grant delete, insert, references, select, trigger, truncate, update on airtable_mapping to service_role;

