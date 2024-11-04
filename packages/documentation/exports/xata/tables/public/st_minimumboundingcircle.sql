create function st_minimumboundingcircle(inputgeom geometry, segs_per_quarter integer default 48) returns geometry
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

comment on function st_minimumboundingcircle(geometry, integer) is 'args: geomA, num_segs_per_qt_circ=48 - Returns the smallest circle polygon that contains a geometry.';

alter function st_minimumboundingcircle(geometry, integer) owner to supabase_admin;

grant execute on function st_minimumboundingcircle(geometry, integer) to postgres;

grant execute on function st_minimumboundingcircle(geometry, integer) to anon;

grant execute on function st_minimumboundingcircle(geometry, integer) to authenticated;

grant execute on function st_minimumboundingcircle(geometry, integer) to service_role;

