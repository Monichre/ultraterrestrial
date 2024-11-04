create function st_makeenvelope(double precision, double precision, double precision, double precision, integer default 0) returns geometry
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

comment on function st_makeenvelope(double precision, double precision, double precision, double precision, integer) is 'args: xmin, ymin, xmax, ymax, srid=unknown - Creates a rectangular Polygon from minimum and maximum coordinates.';

alter function st_makeenvelope(double precision, double precision, double precision, double precision, integer) owner to supabase_admin;

grant execute on function st_makeenvelope(double precision, double precision, double precision, double precision, integer) to postgres;

grant execute on function st_makeenvelope(double precision, double precision, double precision, double precision, integer) to anon;

grant execute on function st_makeenvelope(double precision, double precision, double precision, double precision, integer) to authenticated;

grant execute on function st_makeenvelope(double precision, double precision, double precision, double precision, integer) to service_role;

