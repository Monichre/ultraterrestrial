create function _st_voronoi(g1 geometry, clip geometry default NULL::geometry, tolerance double precision default 0.0, return_polygons boolean default true) returns geometry
    immutable
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _st_voronoi(geometry, geometry, double precision, boolean) owner to supabase_admin;

grant execute on function _st_voronoi(geometry, geometry, double precision, boolean) to postgres;

grant execute on function _st_voronoi(geometry, geometry, double precision, boolean) to anon;

grant execute on function _st_voronoi(geometry, geometry, double precision, boolean) to authenticated;

grant execute on function _st_voronoi(geometry, geometry, double precision, boolean) to service_role;

