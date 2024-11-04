create function st_maxdistance(geom1 geometry, geom2 geometry) returns double precision
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$SELECT public._ST_MaxDistance(public.ST_ConvexHull($1), public.ST_ConvexHull($2))$$;

comment on function st_maxdistance(geometry, geometry) is 'args: g1, g2 - Returns the 2D largest distance between two geometries in projected units.';

alter function st_maxdistance(geometry, geometry) owner to supabase_admin;

grant execute on function st_maxdistance(geometry, geometry) to postgres;

grant execute on function st_maxdistance(geometry, geometry) to anon;

grant execute on function st_maxdistance(geometry, geometry) to authenticated;

grant execute on function st_maxdistance(geometry, geometry) to service_role;

