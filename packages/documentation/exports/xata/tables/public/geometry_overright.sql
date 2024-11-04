create function geometry_overright(geom1 geometry, geom2 geometry) returns boolean
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

alter function geometry_overright(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_overright(geometry, geometry) to postgres;

grant execute on function geometry_overright(geometry, geometry) to anon;

grant execute on function geometry_overright(geometry, geometry) to authenticated;

grant execute on function geometry_overright(geometry, geometry) to service_role;

