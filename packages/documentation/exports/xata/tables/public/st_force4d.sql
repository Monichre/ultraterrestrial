create function st_force4d(geom geometry, zvalue double precision default 0.0, mvalue double precision default 0.0) returns geometry
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

comment on function st_force4d(geometry, double precision, double precision) is 'args: geomA, Zvalue = 0.0, Mvalue = 0.0 - Force the geometries into XYZM mode.';

alter function st_force4d(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_force4d(geometry, double precision, double precision) to postgres;

grant execute on function st_force4d(geometry, double precision, double precision) to anon;

grant execute on function st_force4d(geometry, double precision, double precision) to authenticated;

grant execute on function st_force4d(geometry, double precision, double precision) to service_role;

