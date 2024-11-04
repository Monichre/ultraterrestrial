create function st_numinteriorrings(geometry) returns integer
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

comment on function st_numinteriorrings(geometry) is 'args: a_polygon - Returns the number of interior rings (holes) of a Polygon.';

alter function st_numinteriorrings(geometry) owner to supabase_admin;

grant execute on function st_numinteriorrings(geometry) to postgres;

grant execute on function st_numinteriorrings(geometry) to anon;

grant execute on function st_numinteriorrings(geometry) to authenticated;

grant execute on function st_numinteriorrings(geometry) to service_role;

