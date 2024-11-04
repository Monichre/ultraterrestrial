create function postgis_libprotobuf_version() returns text
    immutable
    strict
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function postgis_libprotobuf_version() owner to supabase_admin;

grant execute on function postgis_libprotobuf_version() to postgres;

grant execute on function postgis_libprotobuf_version() to anon;

grant execute on function postgis_libprotobuf_version() to authenticated;

grant execute on function postgis_libprotobuf_version() to service_role;

