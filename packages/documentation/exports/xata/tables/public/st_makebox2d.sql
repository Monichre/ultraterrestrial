create function st_makebox2d(geom1 geometry, geom2 geometry) returns box2d
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_makebox2d(geometry, geometry) is 'args: pointLowLeft, pointUpRight - Creates a BOX2D defined by two 2D point geometries.';

alter function st_makebox2d(geometry, geometry) owner to supabase_admin;

grant execute on function st_makebox2d(geometry, geometry) to postgres;

grant execute on function st_makebox2d(geometry, geometry) to anon;

grant execute on function st_makebox2d(geometry, geometry) to authenticated;

grant execute on function st_makebox2d(geometry, geometry) to service_role;

