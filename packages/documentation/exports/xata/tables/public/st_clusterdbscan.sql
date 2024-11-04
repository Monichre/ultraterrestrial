create function st_clusterdbscan(geometry, eps double precision, minpoints integer) returns integer
    immutable
    window
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

comment on function st_clusterdbscan(geometry, double precision, integer) is 'args: geom, eps, minpoints - Window function that returns a cluster id for each input geometry using the DBSCAN algorithm.';

alter function st_clusterdbscan(geometry, double precision, integer) owner to supabase_admin;

grant execute on function st_clusterdbscan(geometry, double precision, integer) to postgres;

grant execute on function st_clusterdbscan(geometry, double precision, integer) to anon;

grant execute on function st_clusterdbscan(geometry, double precision, integer) to authenticated;

grant execute on function st_clusterdbscan(geometry, double precision, integer) to service_role;

