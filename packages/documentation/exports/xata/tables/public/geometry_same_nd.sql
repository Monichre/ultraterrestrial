create function geometry_same_nd(geometry, geometry) returns boolean
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_same_nd(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_same_nd(geometry, geometry) to postgres;

grant execute on function geometry_same_nd(geometry, geometry) to anon;

grant execute on function geometry_same_nd(geometry, geometry) to authenticated;

grant execute on function geometry_same_nd(geometry, geometry) to service_role;

