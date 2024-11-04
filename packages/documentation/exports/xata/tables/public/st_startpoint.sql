create function st_startpoint(geometry) returns geometry
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

comment on function st_startpoint(geometry) is 'args: geomA - Returns the first point of a LineString.';

alter function st_startpoint(geometry) owner to supabase_admin;

grant execute on function st_startpoint(geometry) to postgres;

grant execute on function st_startpoint(geometry) to anon;

grant execute on function st_startpoint(geometry) to authenticated;

grant execute on function st_startpoint(geometry) to service_role;

