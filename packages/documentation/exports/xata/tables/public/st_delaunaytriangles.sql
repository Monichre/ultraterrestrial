create function st_delaunaytriangles(g1 geometry, tolerance double precision default 0.0, flags integer default 0) returns geometry
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

comment on function st_delaunaytriangles(geometry, double precision, integer) is 'args: g1, tolerance, flags - Returns the Delaunay triangulation of the vertices of a geometry.';

alter function st_delaunaytriangles(geometry, double precision, integer) owner to supabase_admin;

grant execute on function st_delaunaytriangles(geometry, double precision, integer) to postgres;

grant execute on function st_delaunaytriangles(geometry, double precision, integer) to anon;

grant execute on function st_delaunaytriangles(geometry, double precision, integer) to authenticated;

grant execute on function st_delaunaytriangles(geometry, double precision, integer) to service_role;

