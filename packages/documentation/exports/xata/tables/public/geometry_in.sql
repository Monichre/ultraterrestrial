create function geometry_in(cstring) returns geometry
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

alter function geometry_in(cstring) owner to supabase_admin;

grant execute on function geometry_in(cstring) to postgres;

grant execute on function geometry_in(cstring) to anon;

grant execute on function geometry_in(cstring) to authenticated;

grant execute on function geometry_in(cstring) to service_role;
