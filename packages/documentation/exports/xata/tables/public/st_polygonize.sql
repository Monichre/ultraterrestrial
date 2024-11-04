create function st_polygonize(geometry[]) returns geometry
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

comment on function st_polygonize(geometry[]) is 'args: geom_array - Computes a collection of polygons formed from the linework of a set of geometries.';

alter function st_polygonize(geometry[]) owner to supabase_admin;

grant execute on function st_polygonize(geometry[]) to postgres;

grant execute on function st_polygonize(geometry[]) to anon;

grant execute on function st_polygonize(geometry[]) to authenticated;

grant execute on function st_polygonize(geometry[]) to service_role;

create aggregate st_polygonize(geometry) (
    sfunc = pgis_geometry_accum_transfn,
    stype = internal,
    finalfunc = pgis_geometry_polygonize_finalfn,
    parallel = safe
    );

comment on aggregate st_polygonize(geometry) is 'args: geomfield - Computes a collection of polygons formed from the linework of a set of geometries.';

alter aggregate st_polygonize(geometry) owner to supabase_admin;

grant execute on function st_polygonize(geometry) to postgres;

grant execute on function st_polygonize(geometry) to anon;

grant execute on function st_polygonize(geometry) to authenticated;

grant execute on function st_polygonize(geometry) to service_role;

