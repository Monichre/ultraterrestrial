create function st_voronoilines(g1 geometry, tolerance double precision DEFAULT 0.0, extend_to geometry DEFAULT NULL::geometry) returns geometry
    immutable
    parallel safe
    language sql
as
$$ SELECT public._ST_Voronoi(g1, extend_to, tolerance, false) $$;

comment on function st_voronoilines(geometry, double precision, geometry) is 'args: g1, tolerance, extend_to - Returns the boundaries of the Voronoi diagram of the vertices of a geometry.';

alter function st_voronoilines(geometry, double precision, geometry) owner to supabase_admin;

grant execute on function st_voronoilines(geometry, double precision, geometry) to postgres;

grant execute on function st_voronoilines(geometry, double precision, geometry) to anon;

grant execute on function st_voronoilines(geometry, double precision, geometry) to authenticated;

grant execute on function st_voronoilines(geometry, double precision, geometry) to service_role;

