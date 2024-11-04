create foreign table redis_mapping
    (
        element text
        )
    server ultraterrestrialredis_server
    options (src_type 'list', src_key 'supabase_list', schema 'public');

alter foreign table redis_mapping
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on redis_mapping to anon;

grant delete, insert, references, select, trigger, truncate, update on redis_mapping to authenticated;

grant delete, insert, references, select, trigger, truncate, update on redis_mapping to service_role;

