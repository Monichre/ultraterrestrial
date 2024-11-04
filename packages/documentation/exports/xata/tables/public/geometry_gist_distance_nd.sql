create function geometry_gist_distance_nd(internal, geometry, integer) returns double precision
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_distance_nd(internal, geometry, integer) owner to supabase_admin;

grant execute on function geometry_gist_distance_nd(internal, geometry, integer) to postgres;

grant execute on function geometry_gist_distance_nd(internal, geometry, integer) to anon;

grant execute on function geometry_gist_distance_nd(internal, geometry, integer) to authenticated;

grant execute on function geometry_gist_distance_nd(internal, geometry, integer) to service_role;

