create function st_pointn(geometry, integer) returns geometry
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

comment on function st_pointn(geometry, integer) is 'args: a_linestring, n - Returns the Nth point in the first LineString or circular LineString in a geometry.';

alter function st_pointn(geometry, integer) owner to supabase_admin;

grant execute on function st_pointn(geometry, integer) to postgres;

grant execute on function st_pointn(geometry, integer) to anon;

grant execute on function st_pointn(geometry, integer) to authenticated;

grant execute on function st_pointn(geometry, integer) to service_role;

