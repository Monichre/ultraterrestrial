create function st_clusterintersecting(geometry[]) returns geometry[]
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

alter function st_clusterintersecting(geometry[]) owner to supabase_admin;

grant execute on function st_clusterintersecting(geometry[]) to postgres;

grant execute on function st_clusterintersecting(geometry[]) to anon;

grant execute on function st_clusterintersecting(geometry[]) to authenticated;

grant execute on function st_clusterintersecting(geometry[]) to service_role;

create aggregate st_clusterintersecting(geometry) (
    sfunc = pgis_geometry_accum_transfn,
    stype = internal,
    finalfunc = pgis_geometry_clusterintersecting_finalfn,
    parallel = safe
    );

comment on aggregate st_clusterintersecting(geometry) is 'args: g - Aggregate function that clusters the input geometries into connected sets.';

alter aggregate st_clusterintersecting(geometry) owner to supabase_admin;

grant execute on function st_clusterintersecting(geometry) to postgres;

grant execute on function st_clusterintersecting(geometry) to anon;

grant execute on function st_clusterintersecting(geometry) to authenticated;

grant execute on function st_clusterintersecting(geometry) to service_role;

