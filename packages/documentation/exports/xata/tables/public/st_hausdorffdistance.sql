create function st_hausdorffdistance(geom1 geometry, geom2 geometry) returns double precision
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

comment on function st_hausdorffdistance(geometry, geometry) is 'args: g1, g2 - Returns the Hausdorff distance between two geometries.';

alter function st_hausdorffdistance(geometry, geometry) owner to supabase_admin;

grant execute on function st_hausdorffdistance(geometry, geometry) to postgres;

grant execute on function st_hausdorffdistance(geometry, geometry) to anon;

grant execute on function st_hausdorffdistance(geometry, geometry) to authenticated;

grant execute on function st_hausdorffdistance(geometry, geometry) to service_role;

create function st_hausdorffdistance(geom1 geometry, geom2 geometry, double precision) returns double precision
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

comment on function st_hausdorffdistance(geometry, geometry, double precision) is 'args: g1, g2, densifyFrac - Returns the Hausdorff distance between two geometries.';

alter function st_hausdorffdistance(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_hausdorffdistance(geometry, geometry, double precision) to postgres;

grant execute on function st_hausdorffdistance(geometry, geometry, double precision) to anon;

grant execute on function st_hausdorffdistance(geometry, geometry, double precision) to authenticated;

grant execute on function st_hausdorffdistance(geometry, geometry, double precision) to service_role;

