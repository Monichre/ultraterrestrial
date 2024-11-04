create function postgis_typmod_srid(integer) returns integer
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

alter function postgis_typmod_srid(integer) owner to supabase_admin;

grant execute on function postgis_typmod_srid(integer) to postgres;

grant execute on function postgis_typmod_srid(integer) to anon;

grant execute on function postgis_typmod_srid(integer) to authenticated;

grant execute on function postgis_typmod_srid(integer) to service_role;

