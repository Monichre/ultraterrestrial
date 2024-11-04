create function geometry_lt(geom1 geometry, geom2 geometry) returns boolean
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

alter function geometry_lt(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_lt(geometry, geometry) to postgres;

grant execute on function geometry_lt(geometry, geometry) to anon;

grant execute on function geometry_lt(geometry, geometry) to authenticated;

grant execute on function geometry_lt(geometry, geometry) to service_role;

