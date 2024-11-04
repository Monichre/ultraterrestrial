create function geography_distance_knn(geography, geography) returns double precision
    immutable
    strict
    parallel safe
    cost 100
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_distance_knn(geography, geography) owner to supabase_admin;

grant execute on function geography_distance_knn(geography, geography) to postgres;

grant execute on function geography_distance_knn(geography, geography) to anon;

grant execute on function geography_distance_knn(geography, geography) to authenticated;

grant execute on function geography_distance_knn(geography, geography) to service_role;

