create function st_clusterwithin(geometry[], double precision) returns geometry[]
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

alter function st_clusterwithin(geometry[], double precision) owner to supabase_admin;

grant execute on function st_clusterwithin(geometry[], double precision) to postgres;

grant execute on function st_clusterwithin(geometry[], double precision) to anon;

grant execute on function st_clusterwithin(geometry[], double precision) to authenticated;

grant execute on function st_clusterwithin(geometry[], double precision) to service_role;

create aggregate st_clusterwithin(geometry, double precision) (
    sfunc = pgis_geometry_accum_transfn,
    stype = internal,
    finalfunc = pgis_geometry_clusterwithin_finalfn,
    parallel = safe
    );

comment on aggregate st_clusterwithin(geometry, double precision) is 'args: g, distance - Aggregate function that clusters the input geometries by separation distance.';

alter aggregate st_clusterwithin(geometry, double precision) owner to supabase_admin;

grant execute on function st_clusterwithin(geometry, double precision) to postgres;

grant execute on function st_clusterwithin(geometry, double precision) to anon;

grant execute on function st_clusterwithin(geometry, double precision) to authenticated;

grant execute on function st_clusterwithin(geometry, double precision) to service_role;

