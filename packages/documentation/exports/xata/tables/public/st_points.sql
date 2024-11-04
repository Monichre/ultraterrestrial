create function st_points(geometry) returns geometry
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

comment on function st_points(geometry) is 'args: geom - Returns a MultiPoint containing the coordinates of a geometry.';

alter function st_points(geometry) owner to supabase_admin;

grant execute on function st_points(geometry) to postgres;

grant execute on function st_points(geometry) to anon;

grant execute on function st_points(geometry) to authenticated;

grant execute on function st_points(geometry) to service_role;

