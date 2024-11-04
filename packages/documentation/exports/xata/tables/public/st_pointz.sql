create function st_pointz(xcoordinate double precision, ycoordinate double precision, zcoordinate double precision, srid integer default 0) returns geometry
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

comment on function st_pointz(double precision, double precision, double precision, integer) is 'args: x, y, z, srid=unknown - Creates a Point with X, Y, Z and SRID values.';

alter function st_pointz(double precision, double precision, double precision, integer) owner to supabase_admin;

grant execute on function st_pointz(double precision, double precision, double precision, integer) to postgres;

grant execute on function st_pointz(double precision, double precision, double precision, integer) to anon;

grant execute on function st_pointz(double precision, double precision, double precision, integer) to authenticated;

grant execute on function st_pointz(double precision, double precision, double precision, integer) to service_role;

