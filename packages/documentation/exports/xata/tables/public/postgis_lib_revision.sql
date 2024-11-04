create function postgis_lib_revision() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function postgis_lib_revision() owner to supabase_admin;

grant execute on function postgis_lib_revision() to postgres;

grant execute on function postgis_lib_revision() to anon;

grant execute on function postgis_lib_revision() to authenticated;

grant execute on function postgis_lib_revision() to service_role;

