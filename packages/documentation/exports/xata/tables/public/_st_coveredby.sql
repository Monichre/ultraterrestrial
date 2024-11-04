create function _st_coveredby(geom1 geometry, geom2 geometry) returns boolean
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

alter function _st_coveredby(geometry, geometry) owner to supabase_admin;

grant execute on function _st_coveredby(geometry, geometry) to postgres;

grant execute on function _st_coveredby(geometry, geometry) to anon;

grant execute on function _st_coveredby(geometry, geometry) to authenticated;

grant execute on function _st_coveredby(geometry, geometry) to service_role;

create function _st_coveredby(geog1 geography, geog2 geography) returns boolean
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

alter function _st_coveredby(geography, geography) owner to supabase_admin;

grant execute on function _st_coveredby(geography, geography) to postgres;

grant execute on function _st_coveredby(geography, geography) to anon;

grant execute on function _st_coveredby(geography, geography) to authenticated;

grant execute on function _st_coveredby(geography, geography) to service_role;

