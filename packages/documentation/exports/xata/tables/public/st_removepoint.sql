create function st_removepoint(geometry, integer) returns geometry
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

comment on function st_removepoint(geometry, integer) is 'args: linestring, offset - Remove a point from a linestring.';

alter function st_removepoint(geometry, integer) owner to supabase_admin;

grant execute on function st_removepoint(geometry, integer) to postgres;

grant execute on function st_removepoint(geometry, integer) to anon;

grant execute on function st_removepoint(geometry, integer) to authenticated;

grant execute on function st_removepoint(geometry, integer) to service_role;

