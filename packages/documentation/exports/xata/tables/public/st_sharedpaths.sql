create function st_sharedpaths(geom1 geometry, geom2 geometry) returns geometry
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

comment on function st_sharedpaths(geometry, geometry) is 'args: lineal1, lineal2 - Returns a collection containing paths shared by the two input linestrings/multilinestrings.';

alter function st_sharedpaths(geometry, geometry) owner to supabase_admin;

grant execute on function st_sharedpaths(geometry, geometry) to postgres;

grant execute on function st_sharedpaths(geometry, geometry) to anon;

grant execute on function st_sharedpaths(geometry, geometry) to authenticated;

grant execute on function st_sharedpaths(geometry, geometry) to service_role;

