create function st_frechetdistance(geom1 geometry, geom2 geometry, double precision default '-1'::integer) returns double precision
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

comment on function st_frechetdistance(geometry, geometry, double precision) is 'args: g1, g2, densifyFrac = -1 - Returns the Fréchet distance between two geometries.';

alter function st_frechetdistance(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_frechetdistance(geometry, geometry, double precision) to postgres;

grant execute on function st_frechetdistance(geometry, geometry, double precision) to anon;

grant execute on function st_frechetdistance(geometry, geometry, double precision) to authenticated;

grant execute on function st_frechetdistance(geometry, geometry, double precision) to service_role;

