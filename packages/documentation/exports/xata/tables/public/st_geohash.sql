create function st_geohash(geom geometry, maxchars integer default 0) returns text
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

alter function st_geohash(geometry, integer) owner to supabase_admin;

grant execute on function st_geohash(geometry, integer) to postgres;

grant execute on function st_geohash(geometry, integer) to anon;

grant execute on function st_geohash(geometry, integer) to authenticated;

grant execute on function st_geohash(geometry, integer) to service_role;

create function st_geohash(geog geography, maxchars integer default 0) returns text
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

alter function st_geohash(geography, integer) owner to supabase_admin;

grant execute on function st_geohash(geography, integer) to postgres;

grant execute on function st_geohash(geography, integer) to anon;

grant execute on function st_geohash(geography, integer) to authenticated;

grant execute on function st_geohash(geography, integer) to service_role;

