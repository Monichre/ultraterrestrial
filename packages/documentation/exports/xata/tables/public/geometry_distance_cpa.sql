create function geometry_distance_cpa(geometry, geometry) returns double precision
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_distance_cpa(geometry, geometry) owner to supabase_admin;

grant execute on function geometry_distance_cpa(geometry, geometry) to postgres;

grant execute on function geometry_distance_cpa(geometry, geometry) to anon;

grant execute on function geometry_distance_cpa(geometry, geometry) to authenticated;

grant execute on function geometry_distance_cpa(geometry, geometry) to service_role;

