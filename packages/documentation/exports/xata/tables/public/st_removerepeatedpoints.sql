create function st_removerepeatedpoints(geom geometry, tolerance double precision default 0.0) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_removerepeatedpoints(geometry, double precision) is 'args: geom, tolerance - Returns a version of a geometry with duplicate points removed.';

alter function st_removerepeatedpoints(geometry, double precision) owner to supabase_admin;

grant execute on function st_removerepeatedpoints(geometry, double precision) to postgres;

grant execute on function st_removerepeatedpoints(geometry, double precision) to anon;

grant execute on function st_removerepeatedpoints(geometry, double precision) to authenticated;

grant execute on function st_removerepeatedpoints(geometry, double precision) to service_role;

