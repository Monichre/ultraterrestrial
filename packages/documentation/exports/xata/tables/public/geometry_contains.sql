create function geometry_contains(geom1 geometry, geom2 geometry) returns boolean
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

alter function geometry_contains(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_contains(geometry, geometry) to postgres;

grant execute on function geometry_contains(geometry, geometry) to anon;

grant execute on function geometry_contains(geometry, geometry) to authenticated;

grant execute on function geometry_contains(geometry, geometry) to service_role;
