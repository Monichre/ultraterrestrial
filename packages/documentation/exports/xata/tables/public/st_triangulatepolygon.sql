create function st_triangulatepolygon(g1 geometry) returns geometry
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

comment on function st_triangulatepolygon(geometry) is 'args: geom - Computes the constrained Delaunay triangulation of polygons';

alter function st_triangulatepolygon(geometry) owner to supabase_admin;

grant execute on function st_triangulatepolygon(geometry) to postgres;

grant execute on function st_triangulatepolygon(geometry) to anon;

grant execute on function st_triangulatepolygon(geometry) to authenticated;

grant execute on function st_triangulatepolygon(geometry) to service_role;

