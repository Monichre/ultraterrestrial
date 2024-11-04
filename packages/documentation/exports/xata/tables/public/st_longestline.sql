create function st_longestline(geom1 geometry, geom2 geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$SELECT public._ST_LongestLine(public.ST_ConvexHull($1), public.ST_ConvexHull($2))$$;

comment on function st_longestline(geometry, geometry) is 'args: g1, g2 - Returns the 2D longest line between two geometries.';

alter function st_longestline(geometry, geometry) owner to supabase_admin;

grant execute on function st_longestline(geometry, geometry) to postgres;

grant execute on function st_longestline(geometry, geometry) to anon;

grant execute on function st_longestline(geometry, geometry) to authenticated;

grant execute on function st_longestline(geometry, geometry) to service_role;

