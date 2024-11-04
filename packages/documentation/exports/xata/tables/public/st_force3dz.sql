create function st_force3dz(geom geometry, zvalue double precision default 0.0) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_force3dz(geometry, double precision) is 'args: geomA, Zvalue = 0.0 - Force the geometries into XYZ mode.';

alter function st_force3dz(geometry, double precision) owner to supabase_admin;

grant execute on function st_force3dz(geometry, double precision) to postgres;

grant execute on function st_force3dz(geometry, double precision) to anon;

grant execute on function st_force3dz(geometry, double precision) to authenticated;

grant execute on function st_force3dz(geometry, double precision) to service_role;

