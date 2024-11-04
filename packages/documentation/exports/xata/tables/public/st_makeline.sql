create function st_makeline(geometry[]) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_makeline(geometry[]) is 'args: geoms_array - Creates a LineString from Point, MultiPoint, or LineString geometries.';

alter function st_makeline(geometry[]) owner to supabase_admin;

grant execute on function st_makeline(geometry[]) to postgres;

grant execute on function st_makeline(geometry[]) to anon;

grant execute on function st_makeline(geometry[]) to authenticated;

grant execute on function st_makeline(geometry[]) to service_role;

create function st_makeline(geom1 geometry, geom2 geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_makeline(geometry, geometry) is 'args: geom1, geom2 - Creates a LineString from Point, MultiPoint, or LineString geometries.';

alter function st_makeline(geometry, geometry) owner to supabase_admin;

grant execute on function st_makeline(geometry, geometry) to postgres;

grant execute on function st_makeline(geometry, geometry) to anon;

grant execute on function st_makeline(geometry, geometry) to authenticated;

grant execute on function st_makeline(geometry, geometry) to service_role;

create aggregate st_makeline(geometry) (
    sfunc = pgis_geometry_accum_transfn,
    stype = internal,
    finalfunc = pgis_geometry_makeline_finalfn,
    parallel = safe
    );

comment on aggregate st_makeline(geometry) is 'args: geoms - Creates a LineString from Point, MultiPoint, or LineString geometries.';

alter aggregate st_makeline(geometry) owner to supabase_admin;

grant execute on function st_makeline(geometry) to postgres;

grant execute on function st_makeline(geometry) to anon;

grant execute on function st_makeline(geometry) to authenticated;

grant execute on function st_makeline(geometry) to service_role;

