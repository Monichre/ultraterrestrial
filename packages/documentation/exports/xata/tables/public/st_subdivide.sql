create function st_subdivide(geom geometry, maxvertices integer default 256, gridsize double precision default '-1.0'::numeric) returns setof setof geometry
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

comment on function st_subdivide(geometry, integer, double precision) is 'args: geom, max_vertices=256, gridSize = -1 - Computes a rectilinear subdivision of a geometry.';

alter function st_subdivide(geometry, integer, double precision) owner to supabase_admin;

grant execute on function st_subdivide(geometry, integer, double precision) to postgres;

grant execute on function st_subdivide(geometry, integer, double precision) to anon;

grant execute on function st_subdivide(geometry, integer, double precision) to authenticated;

grant execute on function st_subdivide(geometry, integer, double precision) to service_role;

