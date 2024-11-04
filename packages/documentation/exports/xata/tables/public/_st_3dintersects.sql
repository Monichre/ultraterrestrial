create function _st_3dintersects(geom1 geometry, geom2 geometry) returns boolean
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

alter function _st_3dintersects(geometry, geometry) owner to supabase_admin;

grant execute on function _st_3dintersects(geometry, geometry) to postgres;

grant execute on function _st_3dintersects(geometry, geometry) to anon;

grant execute on function _st_3dintersects(geometry, geometry) to authenticated;

grant execute on function _st_3dintersects(geometry, geometry) to service_role;

