create function postgis_lib_version() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_lib_version() is 'Returns the version number of the PostGIS library.';

alter function postgis_lib_version() owner to supabase_admin;

grant execute on function postgis_lib_version() to postgres;

grant execute on function postgis_lib_version() to anon;

grant execute on function postgis_lib_version() to authenticated;

grant execute on function postgis_lib_version() to service_role;
