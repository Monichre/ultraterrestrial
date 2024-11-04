create function postgis_liblwgeom_version() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_liblwgeom_version() is 'Returns the version number of the liblwgeom library. This should match the version of PostGIS.';

alter function postgis_liblwgeom_version() owner to supabase_admin;

grant execute on function postgis_liblwgeom_version() to postgres;

grant execute on function postgis_liblwgeom_version() to anon;

grant execute on function postgis_liblwgeom_version() to authenticated;

grant execute on function postgis_liblwgeom_version() to service_role;

