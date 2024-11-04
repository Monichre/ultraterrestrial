create function st_snap(geom1 geometry, geom2 geometry, double precision) returns geometry
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

comment on function st_snap(geometry, geometry, double precision) is 'args: input, reference, tolerance - Snap segments and vertices of input geometry to vertices of a reference geometry.';

alter function st_snap(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_snap(geometry, geometry, double precision) to postgres;

grant execute on function st_snap(geometry, geometry, double precision) to anon;

grant execute on function st_snap(geometry, geometry, double precision) to authenticated;

grant execute on function st_snap(geometry, geometry, double precision) to service_role;

