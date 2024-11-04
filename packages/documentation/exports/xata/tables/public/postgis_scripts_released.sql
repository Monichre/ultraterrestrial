create function postgis_scripts_released() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_scripts_released() is 'Returns the version number of the postgis.sql script released with the installed PostGIS lib.';

alter function postgis_scripts_released() owner to supabase_admin;

grant execute on function postgis_scripts_released() to postgres;

grant execute on function postgis_scripts_released() to anon;

grant execute on function postgis_scripts_released() to authenticated;

grant execute on function postgis_scripts_released() to service_role;

