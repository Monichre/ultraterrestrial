create function st_numpoints(geometry) returns integer
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

comment on function st_numpoints(geometry) is 'args: g1 - Returns the number of points in a LineString or CircularString.';

alter function st_numpoints(geometry) owner to supabase_admin;

grant execute on function st_numpoints(geometry) to postgres;

grant execute on function st_numpoints(geometry) to anon;

grant execute on function st_numpoints(geometry) to authenticated;

grant execute on function st_numpoints(geometry) to service_role;

