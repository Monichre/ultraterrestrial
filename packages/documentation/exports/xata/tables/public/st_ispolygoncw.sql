create function st_ispolygoncw(geometry) returns boolean
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

comment on function st_ispolygoncw(geometry) is 'args: geom - Tests if Polygons have exterior rings oriented clockwise and interior rings oriented counter-clockwise.';

alter function st_ispolygoncw(geometry) owner to supabase_admin;

grant execute on function st_ispolygoncw(geometry) to postgres;

grant execute on function st_ispolygoncw(geometry) to anon;

grant execute on function st_ispolygoncw(geometry) to authenticated;

grant execute on function st_ispolygoncw(geometry) to service_role;

