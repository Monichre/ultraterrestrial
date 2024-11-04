create function st_dumppoints(geometry) returns setof setof geometry_dump
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

comment on function st_dumppoints(geometry) is 'args: geom - Returns a set of geometry_dump rows for the coordinates in a geometry.';

alter function st_dumppoints(geometry) owner to supabase_admin;

grant execute on function st_dumppoints(geometry) to postgres;

grant execute on function st_dumppoints(geometry) to anon;

grant execute on function st_dumppoints(geometry) to authenticated;

grant execute on function st_dumppoints(geometry) to service_role;

