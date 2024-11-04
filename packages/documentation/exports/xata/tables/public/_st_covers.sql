create function _st_covers(geom1 geometry, geom2 geometry) returns boolean
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

alter function _st_covers(geometry, geometry) owner to supabase_admin;

grant execute on function _st_covers(geometry, geometry) to postgres;

grant execute on function _st_covers(geometry, geometry) to anon;

grant execute on function _st_covers(geometry, geometry) to authenticated;

grant execute on function _st_covers(geometry, geometry) to service_role;

create function _st_covers(geog1 geography, geog2 geography) returns boolean
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

alter function _st_covers(geography, geography) owner to supabase_admin;

grant execute on function _st_covers(geography, geography) to postgres;

grant execute on function _st_covers(geography, geography) to anon;

grant execute on function _st_covers(geography, geography) to authenticated;

grant execute on function _st_covers(geography, geography) to service_role;

