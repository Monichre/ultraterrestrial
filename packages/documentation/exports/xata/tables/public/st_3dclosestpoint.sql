create function st_3dclosestpoint(geom1 geometry, geom2 geometry) returns geometry
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

comment on function st_3dclosestpoint(geometry, geometry) is 'args: g1, g2 - Returns the 3D point on g1 that is closest to g2. This is the first point of the 3D shortest line.';

alter function st_3dclosestpoint(geometry, geometry) owner to supabase_admin;

grant execute on function st_3dclosestpoint(geometry, geometry) to postgres;

grant execute on function st_3dclosestpoint(geometry, geometry) to anon;

grant execute on function st_3dclosestpoint(geometry, geometry) to authenticated;

grant execute on function st_3dclosestpoint(geometry, geometry) to service_role;

