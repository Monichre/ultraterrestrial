create function st_distancecpa(geometry, geometry) returns double precision
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

comment on function st_distancecpa(geometry, geometry) is 'args: track1, track2 - Returns the distance between the closest point of approach of two trajectories.';

alter function st_distancecpa(geometry, geometry) owner to supabase_admin;

grant execute on function st_distancecpa(geometry, geometry) to postgres;

grant execute on function st_distancecpa(geometry, geometry) to anon;

grant execute on function st_distancecpa(geometry, geometry) to authenticated;

grant execute on function st_distancecpa(geometry, geometry) to service_role;

