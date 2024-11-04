create function postgis_typmod_type(integer) returns text
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

alter function postgis_typmod_type(integer) owner to supabase_admin;

grant execute on function postgis_typmod_type(integer) to postgres;

grant execute on function postgis_typmod_type(integer) to anon;

grant execute on function postgis_typmod_type(integer) to authenticated;

grant execute on function postgis_typmod_type(integer) to service_role;

