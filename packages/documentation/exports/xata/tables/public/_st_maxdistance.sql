create function _st_maxdistance(geom1 geometry, geom2 geometry) returns double precision
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

alter function _st_maxdistance(geometry, geometry) owner to supabase_admin;

grant execute on function _st_maxdistance(geometry, geometry) to postgres;

grant execute on function _st_maxdistance(geometry, geometry) to anon;

grant execute on function _st_maxdistance(geometry, geometry) to authenticated;

grant execute on function _st_maxdistance(geometry, geometry) to service_role;

