create function geometry_gist_same_nd(geometry, geometry, internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_same_nd(geometry, geometry, internal) owner to supabase_admin;

grant execute on function geometry_gist_same_nd(geometry, geometry, internal) to postgres;

grant execute on function geometry_gist_same_nd(geometry, geometry, internal) to anon;

grant execute on function geometry_gist_same_nd(geometry, geometry, internal) to authenticated;

grant execute on function geometry_gist_same_nd(geometry, geometry, internal) to service_role;

