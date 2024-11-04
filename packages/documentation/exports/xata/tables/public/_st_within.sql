create function _st_within(geom1 geometry, geom2 geometry) returns boolean
    immutable
    parallel safe
    language sql
as
$$SELECT public._ST_Contains($2,$1)$$;

alter function _st_within(geometry, geometry) owner to supabase_admin;

grant execute on function _st_within(geometry, geometry) to postgres;

grant execute on function _st_within(geometry, geometry) to anon;

grant execute on function _st_within(geometry, geometry) to authenticated;

grant execute on function _st_within(geometry, geometry) to service_role;

