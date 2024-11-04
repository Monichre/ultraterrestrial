create function st_collect(geom1 geometry, geom2 geometry) returns geometry
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_collect(geometry, geometry) is 'args: g1, g2 - Creates a GeometryCollection or Multi* geometry from a set of geometries.';

alter function st_collect(geometry, geometry) owner to supabase_admin;

grant execute on function st_collect(geometry, geometry) to postgres;

grant execute on function st_collect(geometry, geometry) to anon;

grant execute on function st_collect(geometry, geometry) to authenticated;

grant execute on function st_collect(geometry, geometry) to service_role;

create function st_collect(geometry[]) returns geometry
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

comment on function st_collect(geometry[]) is 'args: g1_array - Creates a GeometryCollection or Multi* geometry from a set of geometries.';

alter function st_collect(geometry[]) owner to supabase_admin;

grant execute on function st_collect(geometry[]) to postgres;

grant execute on function st_collect(geometry[]) to anon;

grant execute on function st_collect(geometry[]) to authenticated;

grant execute on function st_collect(geometry[]) to service_role;

create aggregate st_collect(geometry) (
    sfunc = pgis_geometry_accum_transfn,
    stype = internal,
    finalfunc = pgis_geometry_collect_finalfn,
    parallel = safe
    );

comment on aggregate st_collect(geometry) is 'args: g1field - Creates a GeometryCollection or Multi* geometry from a set of geometries.';

alter aggregate st_collect(geometry) owner to supabase_admin;

grant execute on function st_collect(geometry) to postgres;

grant execute on function st_collect(geometry) to anon;

grant execute on function st_collect(geometry) to authenticated;

grant execute on function st_collect(geometry) to service_role;

