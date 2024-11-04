create function st_orientedenvelope(geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_orientedenvelope(geometry) is 'args: geom - Returns a minimum-area rectangle containing a geometry.';

alter function st_orientedenvelope(geometry) owner to supabase_admin;

grant execute on function st_orientedenvelope(geometry) to postgres;

grant execute on function st_orientedenvelope(geometry) to anon;

grant execute on function st_orientedenvelope(geometry) to authenticated;

grant execute on function st_orientedenvelope(geometry) to service_role;

