create function st_numinteriorring(geometry) returns integer
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

comment on function st_numinteriorring(geometry) is 'args: a_polygon - Returns the number of interior rings (holes) of a Polygon. Aias for ST_NumInteriorRings';

alter function st_numinteriorring(geometry) owner to supabase_admin;

grant execute on function st_numinteriorring(geometry) to postgres;

grant execute on function st_numinteriorring(geometry) to anon;

grant execute on function st_numinteriorring(geometry) to authenticated;

grant execute on function st_numinteriorring(geometry) to service_role;

