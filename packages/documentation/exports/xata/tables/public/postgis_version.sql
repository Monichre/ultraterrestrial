create function postgis_version() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_version() is 'Returns PostGIS version number and compile-time options.';

alter function postgis_version() owner to supabase_admin;

grant execute on function postgis_version() to postgres;

grant execute on function postgis_version() to anon;

grant execute on function postgis_version() to authenticated;

grant execute on function postgis_version() to service_role;

