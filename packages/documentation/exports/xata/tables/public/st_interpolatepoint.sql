create function st_interpolatepoint(line geometry, point geometry) returns double precision
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

comment on function st_interpolatepoint(geometry, geometry) is 'args: linear_geom_with_measure, point - Returns the interpolated measure of a geometry closest to a point.';

alter function st_interpolatepoint(geometry, geometry) owner to supabase_admin;

grant execute on function st_interpolatepoint(geometry, geometry) to postgres;

grant execute on function st_interpolatepoint(geometry, geometry) to anon;

grant execute on function st_interpolatepoint(geometry, geometry) to authenticated;

grant execute on function st_interpolatepoint(geometry, geometry) to service_role;

