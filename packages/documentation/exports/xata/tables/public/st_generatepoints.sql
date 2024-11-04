create function st_generatepoints(area geometry, npoints integer) returns geometry
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_generatepoints(geometry, integer) is 'args: g, npoints - Generates random points contained in a Polygon or MultiPolygon.';

alter function st_generatepoints(geometry, integer) owner to supabase_admin;

grant execute on function st_generatepoints(geometry, integer) to postgres;

grant execute on function st_generatepoints(geometry, integer) to anon;

grant execute on function st_generatepoints(geometry, integer) to authenticated;

grant execute on function st_generatepoints(geometry, integer) to service_role;

create function st_generatepoints(area geometry, npoints integer, seed integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_generatepoints(geometry, integer, integer) is 'args: g, npoints, seed - Generates random points contained in a Polygon or MultiPolygon.';

alter function st_generatepoints(geometry, integer, integer) owner to supabase_admin;

grant execute on function st_generatepoints(geometry, integer, integer) to postgres;

grant execute on function st_generatepoints(geometry, integer, integer) to anon;

grant execute on function st_generatepoints(geometry, integer, integer) to authenticated;

grant execute on function st_generatepoints(geometry, integer, integer) to service_role;

