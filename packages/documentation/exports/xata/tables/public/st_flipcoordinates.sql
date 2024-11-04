create function st_flipcoordinates(geometry) returns geometry
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

comment on function st_flipcoordinates(geometry) is 'args: geom - Returns a version of a geometry with X and Y axis flipped.';

alter function st_flipcoordinates(geometry) owner to supabase_admin;

grant execute on function st_flipcoordinates(geometry) to postgres;

grant execute on function st_flipcoordinates(geometry) to anon;

grant execute on function st_flipcoordinates(geometry) to authenticated;

grant execute on function st_flipcoordinates(geometry) to service_role;

