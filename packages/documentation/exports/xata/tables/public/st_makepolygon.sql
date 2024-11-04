create function st_makepolygon(geometry, geometry[]) returns geometry
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

comment on function st_makepolygon(geometry, geometry[]) is 'args: outerlinestring, interiorlinestrings - Creates a Polygon from a shell and optional list of holes.';

alter function st_makepolygon(geometry, geometry[]) owner to supabase_admin;

grant execute on function st_makepolygon(geometry, geometry[]) to postgres;

grant execute on function st_makepolygon(geometry, geometry[]) to anon;

grant execute on function st_makepolygon(geometry, geometry[]) to authenticated;

grant execute on function st_makepolygon(geometry, geometry[]) to service_role;

create function st_makepolygon(geometry) returns geometry
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

comment on function st_makepolygon(geometry) is 'args: linestring - Creates a Polygon from a shell and optional list of holes.';

alter function st_makepolygon(geometry) owner to supabase_admin;

grant execute on function st_makepolygon(geometry) to postgres;

grant execute on function st_makepolygon(geometry) to anon;

grant execute on function st_makepolygon(geometry) to authenticated;

grant execute on function st_makepolygon(geometry) to service_role;

