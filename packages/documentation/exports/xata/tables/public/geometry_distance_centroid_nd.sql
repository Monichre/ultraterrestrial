create function geometry_distance_centroid_nd(geometry, geometry) returns double precision
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

alter function geometry_distance_centroid_nd(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_distance_centroid_nd(geometry, geometry) to postgres;

grant execute on function geometry_distance_centroid_nd(geometry, geometry) to anon;

grant execute on function geometry_distance_centroid_nd(geometry, geometry) to authenticated;

grant execute on function geometry_distance_centroid_nd(geometry, geometry) to service_role;

