create function st_makepoint(double precision, double precision) returns geometry
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

comment on function st_makepoint(double precision, double precision) is 'args: x, y - Creates a 2D, 3DZ or 4D Point.';

alter function st_makepoint(double precision, double precision) owner to supabase_admin;

grant execute on function st_makepoint(double precision, double precision) to postgres;

grant execute on function st_makepoint(double precision, double precision) to anon;

grant execute on function st_makepoint(double precision, double precision) to authenticated;

grant execute on function st_makepoint(double precision, double precision) to service_role;

create function st_makepoint(double precision, double precision, double precision) returns geometry
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

comment on function st_makepoint(double precision, double precision, double precision) is 'args: x, y, z - Creates a 2D, 3DZ or 4D Point.';

alter function st_makepoint(double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_makepoint(double precision, double precision, double precision) to postgres;

grant execute on function st_makepoint(double precision, double precision, double precision) to anon;

grant execute on function st_makepoint(double precision, double precision, double precision) to authenticated;

grant execute on function st_makepoint(double precision, double precision, double precision) to service_role;

create function st_makepoint(double precision, double precision, double precision, double precision) returns geometry
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

comment on function st_makepoint(double precision, double precision, double precision, double precision) is 'args: x, y, z, m - Creates a 2D, 3DZ or 4D Point.';

alter function st_makepoint(double precision, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_makepoint(double precision, double precision, double precision, double precision) to postgres;

grant execute on function st_makepoint(double precision, double precision, double precision, double precision) to anon;

grant execute on function st_makepoint(double precision, double precision, double precision, double precision) to authenticated;

grant execute on function st_makepoint(double precision, double precision, double precision, double precision) to service_role;

