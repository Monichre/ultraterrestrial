create function st_3dlongestline(geom1 geometry, geom2 geometry) returns geometry
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

comment on function st_3dlongestline(geometry, geometry) is 'args: g1, g2 - Returns the 3D longest line between two geometries';

alter function st_3dlongestline(geometry, geometry) owner to supabase_admin;

grant execute on function st_3dlongestline(geometry, geometry) to postgres;

grant execute on function st_3dlongestline(geometry, geometry) to anon;

grant execute on function st_3dlongestline(geometry, geometry) to authenticated;

grant execute on function st_3dlongestline(geometry, geometry) to service_role;

