create function postgis_geos_version() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_geos_version() is 'Returns the version number of the GEOS library.';

alter function postgis_geos_version() owner to supabase_admin;

grant execute on function postgis_geos_version() to postgres;

grant execute on function postgis_geos_version() to anon;

grant execute on function postgis_geos_version() to authenticated;

grant execute on function postgis_geos_version() to service_role;

