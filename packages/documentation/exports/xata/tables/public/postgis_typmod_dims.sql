create function postgis_typmod_dims(integer) returns integer
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

alter function postgis_typmod_dims(integer) owner to supabase_admin;

grant execute on function postgis_typmod_dims(integer) to postgres;

grant execute on function postgis_typmod_dims(integer) to anon;

grant execute on function postgis_typmod_dims(integer) to authenticated;

grant execute on function postgis_typmod_dims(integer) to service_role;

