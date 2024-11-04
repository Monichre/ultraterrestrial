create function st_hexagon(size double precision, cell_i integer, cell_j integer, origin geometry default '010100000000000000000000000000000000000000'::geometry) returns geometry
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

comment on function st_hexagon(double precision, integer, integer, geometry) is 'args: size, cell_i, cell_j, origin - Returns a single hexagon, using the provided edge size and cell coordinate within the hexagon grid space.';

alter function st_hexagon(double precision, integer, integer, geometry) owner to supabase_admin;

grant execute on function st_hexagon(double precision, integer, integer, geometry) to postgres;

grant execute on function st_hexagon(double precision, integer, integer, geometry) to anon;

grant execute on function st_hexagon(double precision, integer, integer, geometry) to authenticated;

grant execute on function st_hexagon(double precision, integer, integer, geometry) to service_role;

