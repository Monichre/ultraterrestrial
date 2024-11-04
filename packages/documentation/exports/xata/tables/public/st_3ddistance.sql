create function st_3ddistance(geom1 geometry, geom2 geometry) returns double precision
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

comment on function st_3ddistance(geometry, geometry) is 'args: g1, g2 - Returns the 3D cartesian minimum distance (based on spatial ref) between two geometries in projected units.';

alter function st_3ddistance(geometry, geometry) owner to supabase_admin;

grant execute on function st_3ddistance(geometry, geometry) to postgres;

grant execute on function st_3ddistance(geometry, geometry) to anon;

grant execute on function st_3ddistance(geometry, geometry) to authenticated;

grant execute on function st_3ddistance(geometry, geometry) to service_role;

