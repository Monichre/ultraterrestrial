create function st_point(double precision, double precision) returns geometry
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

comment on function st_point(double precision, double precision) is 'args: x, y - Creates a Point with X, Y and SRID values.';

alter function st_point(double precision, double precision) owner to supabase_admin;

grant execute on function st_point(double precision, double precision) to postgres;

grant execute on function st_point(double precision, double precision) to anon;

grant execute on function st_point(double precision, double precision) to authenticated;

grant execute on function st_point(double precision, double precision) to service_role;

create function st_point(double precision, double precision, srid integer) returns geometry
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

comment on function st_point(double precision, double precision, integer) is 'args: x, y, srid=unknown - Creates a Point with X, Y and SRID values.';

alter function st_point(double precision, double precision, integer) owner to supabase_admin;

grant execute on function st_point(double precision, double precision, integer) to postgres;

grant execute on function st_point(double precision, double precision, integer) to anon;

grant execute on function st_point(double precision, double precision, integer) to authenticated;

grant execute on function st_point(double precision, double precision, integer) to service_role;

