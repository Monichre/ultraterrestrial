create function st_endpoint(geometry) returns geometry
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

comment on function st_endpoint(geometry) is 'args: g - Returns the last point of a LineString or CircularLineString.';

alter function st_endpoint(geometry) owner to supabase_admin;

grant execute on function st_endpoint(geometry) to postgres;

grant execute on function st_endpoint(geometry) to anon;

grant execute on function st_endpoint(geometry) to authenticated;

grant execute on function st_endpoint(geometry) to service_role;

