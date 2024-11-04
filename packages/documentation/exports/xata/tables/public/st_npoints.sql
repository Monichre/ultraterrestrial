create function st_npoints(geometry) returns integer
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

comment on function st_npoints(geometry) is 'args: g1 - Returns the number of points (vertices) in a geometry.';

alter function st_npoints(geometry) owner to supabase_admin;

grant execute on function st_npoints(geometry) to postgres;

grant execute on function st_npoints(geometry) to anon;

grant execute on function st_npoints(geometry) to authenticated;

grant execute on function st_npoints(geometry) to service_role;

