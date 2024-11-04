create function postgis_wagyu_version() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_wagyu_version() is 'Returns the version number of the internal Wagyu library.';

alter function postgis_wagyu_version() owner to supabase_admin;

grant execute on function postgis_wagyu_version() to postgres;

grant execute on function postgis_wagyu_version() to anon;

grant execute on function postgis_wagyu_version() to authenticated;

grant execute on function postgis_wagyu_version() to service_role;

