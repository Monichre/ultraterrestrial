create function geometry_cmp(geom1 geometry, geom2 geometry) returns integer
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

alter function geometry_cmp(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_cmp(geometry, geometry) to postgres;

grant execute on function geometry_cmp(geometry, geometry) to anon;

grant execute on function geometry_cmp(geometry, geometry) to authenticated;

grant execute on function geometry_cmp(geometry, geometry) to service_role;

