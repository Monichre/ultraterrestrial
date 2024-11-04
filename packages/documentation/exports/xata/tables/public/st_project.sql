create function st_project(geog geography, distance double precision, azimuth double precision) returns geography
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_project(geography, double precision, double precision) is 'args: g1, distance, azimuth - Returns a point projected from a start point by a distance and bearing (azimuth).';

alter function st_project(geography, double precision, double precision) owner to supabase_admin;

grant execute on function st_project(geography, double precision, double precision) to postgres;

grant execute on function st_project(geography, double precision, double precision) to anon;

grant execute on function st_project(geography, double precision, double precision) to authenticated;

grant execute on function st_project(geography, double precision, double precision) to service_role;

