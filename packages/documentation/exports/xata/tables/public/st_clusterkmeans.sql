create function st_clusterkmeans(geom geometry, k integer, max_radius double precision default NULL::double precision) returns integer
    window
    strict
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_clusterkmeans(geometry, integer, double precision) is 'args: geom, number_of_clusters, max_radius - Window function that returns a cluster id for each input geometry using the K-means algorithm.';

alter function st_clusterkmeans(geometry, integer, double precision) owner to supabase_admin;

grant execute on function st_clusterkmeans(geometry, integer, double precision) to postgres;

grant execute on function st_clusterkmeans(geometry, integer, double precision) to anon;

grant execute on function st_clusterkmeans(geometry, integer, double precision) to authenticated;

grant execute on function st_clusterkmeans(geometry, integer, double precision) to service_role;

