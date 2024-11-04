create function st_linesubstring(geometry, double precision, double precision) returns geometry
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

comment on function st_linesubstring(geometry, double precision, double precision) is 'args: a_linestring, startfraction, endfraction - Returns the part of a line between two fractional locations.';

alter function st_linesubstring(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_linesubstring(geometry, double precision, double precision) to postgres;

grant execute on function st_linesubstring(geometry, double precision, double precision) to anon;

grant execute on function st_linesubstring(geometry, double precision, double precision) to authenticated;

grant execute on function st_linesubstring(geometry, double precision, double precision) to service_role;

