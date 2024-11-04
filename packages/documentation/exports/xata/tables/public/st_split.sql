create function st_split(geom1 geometry, geom2 geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_split(geometry, geometry) is 'args: input, blade - Returns a collection of geometries created by splitting a geometry by another geometry.';

alter function st_split(geometry, geometry) owner to supabase_admin;

grant execute on function st_split(geometry, geometry) to postgres;

grant execute on function st_split(geometry, geometry) to anon;

grant execute on function st_split(geometry, geometry) to authenticated;

grant execute on function st_split(geometry, geometry) to service_role;

