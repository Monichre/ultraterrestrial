create function st_force3dm(geom geometry, mvalue double precision default 0.0) returns geometry
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

comment on function st_force3dm(geometry, double precision) is 'args: geomA, Mvalue = 0.0 - Force the geometries into XYM mode.';

alter function st_force3dm(geometry, double precision) owner to supabase_admin;

grant execute on function st_force3dm(geometry, double precision) to postgres;

grant execute on function st_force3dm(geometry, double precision) to anon;

grant execute on function st_force3dm(geometry, double precision) to authenticated;

grant execute on function st_force3dm(geometry, double precision) to service_role;

