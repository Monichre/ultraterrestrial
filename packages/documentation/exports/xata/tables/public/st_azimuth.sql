create function st_azimuth(geom1 geometry, geom2 geometry) returns double precision
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

comment on function st_azimuth(geometry, geometry) is 'args: origin, target - Returns the north-based azimuth of a line between two points.';

alter function st_azimuth(geometry, geometry) owner to supabase_admin;

grant execute on function st_azimuth(geometry, geometry) to postgres;

grant execute on function st_azimuth(geometry, geometry) to anon;

grant execute on function st_azimuth(geometry, geometry) to authenticated;

grant execute on function st_azimuth(geometry, geometry) to service_role;

create function st_azimuth(geog1 geography, geog2 geography) returns double precision
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

comment on function st_azimuth(geography, geography) is 'args: origin, target - Returns the north-based azimuth of a line between two points.';

alter function st_azimuth(geography, geography) owner to supabase_admin;

grant execute on function st_azimuth(geography, geography) to postgres;

grant execute on function st_azimuth(geography, geography) to anon;

grant execute on function st_azimuth(geography, geography) to authenticated;

grant execute on function st_azimuth(geography, geography) to service_role;

