create function st_squaregrid(size double precision, bounds geometry, out geom geometry, out i integer, out j integer) returns setof setof record
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

comment on function st_squaregrid(double precision, geometry, out geometry, out integer, out integer) is 'args: size, bounds - Returns a set of grid squares and cell indices that completely cover the bounds of the geometry argument.';

alter function st_squaregrid(double precision, geometry, out geometry, out integer, out integer) owner to supabase_admin;

grant execute on function st_squaregrid(double precision, geometry, out geometry, out integer, out integer) to postgres;

grant execute on function st_squaregrid(double precision, geometry, out geometry, out integer, out integer) to anon;

grant execute on function st_squaregrid(double precision, geometry, out geometry, out integer, out integer) to authenticated;

grant execute on function st_squaregrid(double precision, geometry, out geometry, out integer, out integer) to service_role;

