create function postgis_libjson_version() returns text
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function postgis_libjson_version() owner to supabase_admin;

grant execute on function postgis_libjson_version() to postgres;

grant execute on function postgis_libjson_version() to anon;

grant execute on function postgis_libjson_version() to authenticated;

grant execute on function postgis_libjson_version() to service_role;

