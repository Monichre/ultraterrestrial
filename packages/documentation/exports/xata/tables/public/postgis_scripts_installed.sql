create function postgis_scripts_installed() returns text
    immutable
    language sql
as
$$ SELECT trim('3.3.2'::text || $rev$ 4975da8 $rev$) AS version $$;

comment on function postgis_scripts_installed() is 'Returns version of the PostGIS scripts installed in this database.';

alter function postgis_scripts_installed() owner to supabase_admin;

grant execute on function postgis_scripts_installed() to postgres;

grant execute on function postgis_scripts_installed() to anon;

grant execute on function postgis_scripts_installed() to authenticated;

grant execute on function postgis_scripts_installed() to service_role;

