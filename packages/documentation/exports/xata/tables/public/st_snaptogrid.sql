create function st_snaptogrid(geometry, double precision, double precision, double precision, double precision) returns geometry
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

comment on function st_snaptogrid(geometry, double precision, double precision, double precision, double precision) is 'args: geomA, originX, originY, sizeX, sizeY - Snap all points of the input geometry to a regular grid.';

alter function st_snaptogrid(geometry, double precision, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_snaptogrid(geometry, double precision, double precision, double precision, double precision) to postgres;

grant execute on function st_snaptogrid(geometry, double precision, double precision, double precision, double precision) to anon;

grant execute on function st_snaptogrid(geometry, double precision, double precision, double precision, double precision) to authenticated;

grant execute on function st_snaptogrid(geometry, double precision, double precision, double precision, double precision) to service_role;

create function st_snaptogrid(geometry, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_SnapToGrid($1, 0, 0, $2, $3)$$;

comment on function st_snaptogrid(geometry, double precision, double precision) is 'args: geomA, sizeX, sizeY - Snap all points of the input geometry to a regular grid.';

alter function st_snaptogrid(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_snaptogrid(geometry, double precision, double precision) to postgres;

grant execute on function st_snaptogrid(geometry, double precision, double precision) to anon;

grant execute on function st_snaptogrid(geometry, double precision, double precision) to authenticated;

grant execute on function st_snaptogrid(geometry, double precision, double precision) to service_role;

create function st_snaptogrid(geometry, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_SnapToGrid($1, 0, 0, $2, $2)$$;

comment on function st_snaptogrid(geometry, double precision) is 'args: geomA, size - Snap all points of the input geometry to a regular grid.';

alter function st_snaptogrid(geometry, double precision) owner to supabase_admin;

grant execute on function st_snaptogrid(geometry, double precision) to postgres;

grant execute on function st_snaptogrid(geometry, double precision) to anon;

grant execute on function st_snaptogrid(geometry, double precision) to authenticated;

grant execute on function st_snaptogrid(geometry, double precision) to service_role;

create function st_snaptogrid(geom1 geometry, geom2 geometry, double precision, double precision, double precision, double precision) returns geometry
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

comment on function st_snaptogrid(geometry, geometry, double precision, double precision, double precision, double precision) is 'args: geomA, pointOrigin, sizeX, sizeY, sizeZ, sizeM - Snap all points of the input geometry to a regular grid.';

alter function st_snaptogrid(geometry, geometry, double precision, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_snaptogrid(geometry, geometry, double precision, double precision, double precision, double precision) to postgres;

grant execute on function st_snaptogrid(geometry, geometry, double precision, double precision, double precision, double precision) to anon;

grant execute on function st_snaptogrid(geometry, geometry, double precision, double precision, double precision, double precision) to authenticated;

grant execute on function st_snaptogrid(geometry, geometry, double precision, double precision, double precision, double precision) to service_role;

