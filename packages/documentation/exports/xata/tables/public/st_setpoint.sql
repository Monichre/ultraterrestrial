create function st_setpoint(geometry, integer, geometry) returns geometry
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

comment on function st_setpoint(geometry, integer, geometry) is 'args: linestring, zerobasedposition, point - Replace point of a linestring with a given point.';

alter function st_setpoint(geometry, integer, geometry) owner to supabase_admin;

grant execute on function st_setpoint(geometry, integer, geometry) to postgres;

grant execute on function st_setpoint(geometry, integer, geometry) to anon;

grant execute on function st_setpoint(geometry, integer, geometry) to authenticated;

grant execute on function st_setpoint(geometry, integer, geometry) to service_role;

