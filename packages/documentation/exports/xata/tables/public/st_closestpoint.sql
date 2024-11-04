create function st_closestpoint(geom1 geometry, geom2 geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_closestpoint(geometry, geometry) is 'args: geom1, geom2 - Returns the 2D point on g1 that is closest to g2. This is the first point of the shortest line from one geometry to the other.';

alter function st_closestpoint(geometry, geometry) owner to supabase_admin;

grant execute on function st_closestpoint(geometry, geometry) to postgres;

grant execute on function st_closestpoint(geometry, geometry) to anon;

grant execute on function st_closestpoint(geometry, geometry) to authenticated;

grant execute on function st_closestpoint(geometry, geometry) to service_role;

