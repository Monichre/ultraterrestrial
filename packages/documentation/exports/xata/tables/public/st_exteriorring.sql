create function st_exteriorring(geometry) returns geometry
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

comment on function st_exteriorring(geometry) is 'args: a_polygon - Returns a LineString representing the exterior ring of a Polygon.';

alter function st_exteriorring(geometry) owner to supabase_admin;

grant execute on function st_exteriorring(geometry) to postgres;

grant execute on function st_exteriorring(geometry) to anon;

grant execute on function st_exteriorring(geometry) to authenticated;

grant execute on function st_exteriorring(geometry) to service_role;

