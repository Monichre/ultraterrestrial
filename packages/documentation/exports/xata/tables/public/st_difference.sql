create function st_difference(geom1 geometry, geom2 geometry, gridsize double precision default '-1.0'::numeric) returns geometry
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

comment on function st_difference(geometry, geometry, double precision) is 'args: geomA, geomB, gridSize = -1 - Computes a geometry representing the part of geometry A that does not intersect geometry B.';

alter function st_difference(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_difference(geometry, geometry, double precision) to postgres;

grant execute on function st_difference(geometry, geometry, double precision) to anon;

grant execute on function st_difference(geometry, geometry, double precision) to authenticated;

grant execute on function st_difference(geometry, geometry, double precision) to service_role;

