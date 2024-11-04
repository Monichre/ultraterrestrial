create function st_closestpointofapproach(geometry, geometry) returns double precision
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

comment on function st_closestpointofapproach(geometry, geometry) is 'args: track1, track2 - Returns a measure at the closest point of approach of two trajectories.';

alter function st_closestpointofapproach(geometry, geometry) owner to supabase_admin;

grant execute on function st_closestpointofapproach(geometry, geometry) to postgres;

grant execute on function st_closestpointofapproach(geometry, geometry) to anon;

grant execute on function st_closestpointofapproach(geometry, geometry) to authenticated;

grant execute on function st_closestpointofapproach(geometry, geometry) to service_role;

