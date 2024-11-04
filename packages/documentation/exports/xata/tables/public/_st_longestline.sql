create function _st_longestline(geom1 geometry, geom2 geometry) returns geometry
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

alter function _st_longestline(geometry, geometry) owner to supabase_admin;

grant execute on function _st_longestline(geometry, geometry) to postgres;

grant execute on function _st_longestline(geometry, geometry) to anon;

grant execute on function _st_longestline(geometry, geometry) to authenticated;

grant execute on function _st_longestline(geometry, geometry) to service_role;

