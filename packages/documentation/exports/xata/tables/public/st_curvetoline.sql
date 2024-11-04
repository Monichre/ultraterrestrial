create function st_curvetoline(geom geometry, tol double precision default 32, toltype integer default 0, flags integer default 0) returns geometry
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

comment on function st_curvetoline(geometry, double precision, integer, integer) is 'args: curveGeom, tolerance, tolerance_type, flags - Converts a geometry containing curves to a linear geometry.';

alter function st_curvetoline(geometry, double precision, integer, integer) owner to supabase_admin;

grant execute on function st_curvetoline(geometry, double precision, integer, integer) to postgres;

grant execute on function st_curvetoline(geometry, double precision, integer, integer) to anon;

grant execute on function st_curvetoline(geometry, double precision, integer, integer) to authenticated;

grant execute on function st_curvetoline(geometry, double precision, integer, integer) to service_role;

