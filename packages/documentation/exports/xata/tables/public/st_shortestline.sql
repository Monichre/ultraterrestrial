create function st_shortestline(geom1 geometry, geom2 geometry) returns geometry
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

comment on function st_shortestline(geometry, geometry) is 'args: geom1, geom2 - Returns the 2D shortest line between two geometries';

alter function st_shortestline(geometry, geometry) owner to supabase_admin;

grant execute on function st_shortestline(geometry, geometry) to postgres;

grant execute on function st_shortestline(geometry, geometry) to anon;

grant execute on function st_shortestline(geometry, geometry) to authenticated;

grant execute on function st_shortestline(geometry, geometry) to service_role;

