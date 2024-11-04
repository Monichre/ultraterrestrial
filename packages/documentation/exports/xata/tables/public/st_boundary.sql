create function st_boundary(geometry) returns geometry
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

comment on function st_boundary(geometry) is 'args: geomA - Returns the boundary of a geometry.';

alter function st_boundary(geometry) owner to supabase_admin;

grant execute on function st_boundary(geometry) to postgres;

grant execute on function st_boundary(geometry) to anon;

grant execute on function st_boundary(geometry) to authenticated;

grant execute on function st_boundary(geometry) to service_role;

