create function st_force2d(geometry) returns geometry
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

comment on function st_force2d(geometry) is 'args: geomA - Force the geometries into a "2-dimensional mode".';

alter function st_force2d(geometry) owner to supabase_admin;

grant execute on function st_force2d(geometry) to postgres;

grant execute on function st_force2d(geometry) to anon;

grant execute on function st_force2d(geometry) to authenticated;

grant execute on function st_force2d(geometry) to service_role;

