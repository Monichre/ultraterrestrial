create function st_dumprings(geometry) returns setof setof geometry_dump
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

comment on function st_dumprings(geometry) is 'args: a_polygon - Returns a set of geometry_dump rows for the exterior and interior rings of a Polygon.';

alter function st_dumprings(geometry) owner to supabase_admin;

grant execute on function st_dumprings(geometry) to postgres;

grant execute on function st_dumprings(geometry) to anon;

grant execute on function st_dumprings(geometry) to authenticated;

grant execute on function st_dumprings(geometry) to service_role;

