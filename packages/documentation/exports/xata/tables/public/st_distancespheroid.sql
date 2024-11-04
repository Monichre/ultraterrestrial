create function st_distancespheroid(geom1 geometry, geom2 geometry, spheroid) returns double precision
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_distancespheroid(geometry, geometry, spheroid) is 'args: geomlonlatA, geomlonlatB, measurement_spheroid=WGS84 - Returns the minimum distance between two lon/lat geometries using a spheroidal earth model.';

alter function st_distancespheroid(geometry, geometry, spheroid) owner to supabase_admin;

grant execute on function st_distancespheroid(geometry, geometry, spheroid) to postgres;

grant execute on function st_distancespheroid(geometry, geometry, spheroid) to anon;

grant execute on function st_distancespheroid(geometry, geometry, spheroid) to authenticated;

grant execute on function st_distancespheroid(geometry, geometry, spheroid) to service_role;

create function st_distancespheroid(geom1 geometry, geom2 geometry) returns double precision
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_distancespheroid(geometry, geometry) owner to supabase_admin;

grant execute on function st_distancespheroid(geometry, geometry) to postgres;

grant execute on function st_distancespheroid(geometry, geometry) to anon;

grant execute on function st_distancespheroid(geometry, geometry) to authenticated;

grant execute on function st_distancespheroid(geometry, geometry) to service_role;

