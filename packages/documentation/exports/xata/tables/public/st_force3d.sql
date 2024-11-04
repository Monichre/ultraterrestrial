create function st_force3d(geom geometry, zvalue double precision DEFAULT 0.0) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Force3DZ($1, $2)$$;

comment on function st_force3d(geometry, double precision) is 'args: geomA, Zvalue = 0.0 - Force the geometries into XYZ mode. This is an alias for ST_Force3DZ.';

alter function st_force3d(geometry, double precision) owner to supabase_admin;

grant execute on function st_force3d(geometry, double precision) to postgres;

grant execute on function st_force3d(geometry, double precision) to anon;

grant execute on function st_force3d(geometry, double precision) to authenticated;

grant execute on function st_force3d(geometry, double precision) to service_role;

