create function geometry_distance_centroid(geom1 geometry, geom2 geometry) returns double precision
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

alter function geometry_distance_centroid(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_distance_centroid(geometry, geometry) to postgres;

grant execute on function geometry_distance_centroid(geometry, geometry) to anon;

grant execute on function geometry_distance_centroid(geometry, geometry) to authenticated;

grant execute on function geometry_distance_centroid(geometry, geometry) to service_role;

