create function st_linelocatepoint(geom1 geometry, geom2 geometry) returns double precision
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_linelocatepoint(geometry, geometry) is 'args: a_linestring, a_point - Returns the fractional location of the closest point on a line to a point.';

alter function st_linelocatepoint(geometry, geometry) owner to supabase_admin;

grant execute on function st_linelocatepoint(geometry, geometry) to postgres;

grant execute on function st_linelocatepoint(geometry, geometry) to anon;

grant execute on function st_linelocatepoint(geometry, geometry) to authenticated;

grant execute on function st_linelocatepoint(geometry, geometry) to service_role;

