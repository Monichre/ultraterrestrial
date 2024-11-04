create function postgis_libxml_version() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_libxml_version() is 'Returns the version number of the libxml2 library.';

alter function postgis_libxml_version() owner to supabase_admin;

grant execute on function postgis_libxml_version() to postgres;

grant execute on function postgis_libxml_version() to anon;

grant execute on function postgis_libxml_version() to authenticated;

grant execute on function postgis_libxml_version() to service_role;

