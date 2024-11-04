create function st_ispolygonccw(geometry) returns boolean
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

comment on function st_ispolygonccw(geometry) is 'args: geom - Tests if Polygons have exterior rings oriented counter-clockwise and interior rings oriented clockwise.';

alter function st_ispolygonccw(geometry) owner to supabase_admin;

grant execute on function st_ispolygonccw(geometry) to postgres;

grant execute on function st_ispolygonccw(geometry) to anon;

grant execute on function st_ispolygonccw(geometry) to authenticated;

grant execute on function st_ispolygonccw(geometry) to service_role;

