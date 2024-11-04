create function postgis_scripts_build_date() returns text
    immutable
    language sql
as
$$SELECT '2022-11-13 07:09:50'::text AS version$$;

comment on function postgis_scripts_build_date() is 'Returns build date of the PostGIS scripts.';

alter function postgis_scripts_build_date() owner to supabase_admin;

grant execute on function postgis_scripts_build_date() to postgres;

grant execute on function postgis_scripts_build_date() to anon;

grant execute on function postgis_scripts_build_date() to authenticated;

grant execute on function postgis_scripts_build_date() to service_role;

