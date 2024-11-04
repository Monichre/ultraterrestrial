create function st_union(geom1 geometry, geom2 geometry) returns geometry
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

comment on function st_union(geometry, geometry) is 'args: g1, g2 - Computes a geometry representing the point-set union of the input geometries.';

alter function st_union(geometry, geometry) owner to supabase_admin;

grant execute on function st_union(geometry, geometry) to postgres;

grant execute on function st_union(geometry, geometry) to anon;

grant execute on function st_union(geometry, geometry) to authenticated;

grant execute on function st_union(geometry, geometry) to service_role;

create function st_union(geom1 geometry, geom2 geometry, gridsize double precision) returns geometry
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

comment on function st_union(geometry, geometry, double precision) is 'args: g1, g2, gridSize - Computes a geometry representing the point-set union of the input geometries.';

alter function st_union(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_union(geometry, geometry, double precision) to postgres;

grant execute on function st_union(geometry, geometry, double precision) to anon;

grant execute on function st_union(geometry, geometry, double precision) to authenticated;

grant execute on function st_union(geometry, geometry, double precision) to service_role;

create function st_union(geometry[]) returns geometry
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

comment on function st_union(geometry[]) is 'args: g1_array - Computes a geometry representing the point-set union of the input geometries.';

alter function st_union(geometry[]) owner to supabase_admin;

grant execute on function st_union(geometry[]) to postgres;

grant execute on function st_union(geometry[]) to anon;

grant execute on function st_union(geometry[]) to authenticated;

grant execute on function st_union(geometry[]) to service_role;

create aggregate st_union(geometry) (
    sfunc = pgis_geometry_union_parallel_transfn,
    stype = internal,
    finalfunc = pgis_geometry_union_parallel_finalfn,
    combinefunc = pgis_geometry_union_parallel_combinefn,
    serialfunc = pgis_geometry_union_parallel_serialfn,
    deserialfunc = pgis_geometry_union_parallel_deserialfn,
    parallel = safe
    );

comment on aggregate st_union(geometry) is 'args: g1field - Computes a geometry representing the point-set union of the input geometries.';

alter aggregate st_union(geometry) owner to supabase_admin;

grant execute on function st_union(geometry) to postgres;

grant execute on function st_union(geometry) to anon;

grant execute on function st_union(geometry) to authenticated;

grant execute on function st_union(geometry) to service_role;

create aggregate st_union(geometry, gridsize double precision) (
    sfunc = pgis_geometry_union_parallel_transfn,
    stype = internal,
    finalfunc = pgis_geometry_union_parallel_finalfn,
    combinefunc = pgis_geometry_union_parallel_combinefn,
    serialfunc = pgis_geometry_union_parallel_serialfn,
    deserialfunc = pgis_geometry_union_parallel_deserialfn,
    parallel = safe
    );

comment on aggregate st_union(geometry, double precision) is 'args: g1field, gridSize - Computes a geometry representing the point-set union of the input geometries.';

alter aggregate st_union(geometry, gridsize double precision) owner to supabase_admin;

grant execute on function st_union(geometry, gridsize double precision) to postgres;

grant execute on function st_union(geometry, gridsize double precision) to anon;

grant execute on function st_union(geometry, gridsize double precision) to authenticated;

grant execute on function st_union(geometry, gridsize double precision) to service_role;

