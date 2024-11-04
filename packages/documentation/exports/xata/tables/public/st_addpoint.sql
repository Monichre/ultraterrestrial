create function st_addpoint(geom1 geometry, geom2 geometry) returns geometry
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

comment on function st_addpoint(geometry, geometry) is 'args: linestring, point - Add a point to a LineString.';

alter function st_addpoint(geometry, geometry) owner to supabase_admin;

grant execute on function st_addpoint(geometry, geometry) to postgres;

grant execute on function st_addpoint(geometry, geometry) to anon;

grant execute on function st_addpoint(geometry, geometry) to authenticated;

grant execute on function st_addpoint(geometry, geometry) to service_role;

create function st_addpoint(geom1 geometry, geom2 geometry, integer) returns geometry
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

comment on function st_addpoint(geometry, geometry, integer) is 'args: linestring, point, position = -1 - Add a point to a LineString.';

alter function st_addpoint(geometry, geometry, integer) owner to supabase_admin;

grant execute on function st_addpoint(geometry, geometry, integer) to postgres;

grant execute on function st_addpoint(geometry, geometry, integer) to anon;

grant execute on function st_addpoint(geometry, geometry, integer) to authenticated;

grant execute on function st_addpoint(geometry, geometry, integer) to service_role;

