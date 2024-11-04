create function st_distancesphere(geom1 geometry, geom2 geometry) returns double precision
    immutable
    strict
    parallel safe
    language sql
as
$$select public.ST_distance( public.geography($1), public.geography($2),false)$$;

alter function st_distancesphere(geometry, geometry) owner to supabase_admin;

grant execute on function st_distancesphere(geometry, geometry) to postgres;

grant execute on function st_distancesphere(geometry, geometry) to anon;

grant execute on function st_distancesphere(geometry, geometry) to authenticated;

grant execute on function st_distancesphere(geometry, geometry) to service_role;

create function st_distancesphere(geom1 geometry, geom2 geometry, radius double precision) returns double precision
    immutable
    strict
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_distancesphere(geometry, geometry, double precision) is 'args: geomlonlatA, geomlonlatB, radius=6371008 - Returns minimum distance in meters between two lon/lat geometries using a spherical earth model.';

alter function st_distancesphere(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_distancesphere(geometry, geometry, double precision) to postgres;

grant execute on function st_distancesphere(geometry, geometry, double precision) to anon;

grant execute on function st_distancesphere(geometry, geometry, double precision) to authenticated;

grant execute on function st_distancesphere(geometry, geometry, double precision) to service_role;

