create function geometry_typmod_out(integer) returns cstring
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

alter function geometry_typmod_out(integer) owner to supabase_admin;

grant execute on function geometry_typmod_out(integer) to postgres;

grant execute on function geometry_typmod_out(integer) to anon;

grant execute on function geometry_typmod_out(integer) to authenticated;

grant execute on function geometry_typmod_out(integer) to service_role;

