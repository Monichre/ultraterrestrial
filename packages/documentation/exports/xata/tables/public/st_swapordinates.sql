create function st_swapordinates(geom geometry, ords cstring) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_swapordinates(geometry, cstring) is 'args: geom, ords - Returns a version of the given geometry with given ordinate values swapped.';

alter function st_swapordinates(geometry, cstring) owner to supabase_admin;

grant execute on function st_swapordinates(geometry, cstring) to postgres;

grant execute on function st_swapordinates(geometry, cstring) to anon;

grant execute on function st_swapordinates(geometry, cstring) to authenticated;

grant execute on function st_swapordinates(geometry, cstring) to service_role;

