create function postgis_proj_version() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_proj_version() is 'Returns the version number of the PROJ4 library.';

alter function postgis_proj_version() owner to supabase_admin;

grant execute on function postgis_proj_version() to postgres;

grant execute on function postgis_proj_version() to anon;

grant execute on function postgis_proj_version() to authenticated;

grant execute on function postgis_proj_version() to service_role;

