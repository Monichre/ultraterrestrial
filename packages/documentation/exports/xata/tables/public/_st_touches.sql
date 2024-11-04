create function _st_touches(geom1 geometry, geom2 geometry) returns boolean
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

alter function _st_touches(geometry, geometry) owner to supabase_admin;

grant execute on function _st_touches(geometry, geometry) to postgres;

grant execute on function _st_touches(geometry, geometry) to anon;

grant execute on function _st_touches(geometry, geometry) to authenticated;

grant execute on function _st_touches(geometry, geometry) to service_role;

