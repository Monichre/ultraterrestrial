create function _postgis_scripts_pgsql_version() returns text
    immutable
    language sql
as
$$SELECT '150'::text AS version$$;

alter function _postgis_scripts_pgsql_version() owner to supabase_admin;

grant execute on function _postgis_scripts_pgsql_version() to postgres;

grant execute on function _postgis_scripts_pgsql_version() to anon;

grant execute on function _postgis_scripts_pgsql_version() to authenticated;

grant execute on function _postgis_scripts_pgsql_version() to service_role;

