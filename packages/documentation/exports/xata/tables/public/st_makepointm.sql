create function st_makepointm(double precision, double precision, double precision) returns geometry
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

comment on function st_makepointm(double precision, double precision, double precision) is 'args: x, y, m - Creates a Point from X, Y and M values.';

alter function st_makepointm(double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_makepointm(double precision, double precision, double precision) to postgres;

grant execute on function st_makepointm(double precision, double precision, double precision) to anon;

grant execute on function st_makepointm(double precision, double precision, double precision) to authenticated;

grant execute on function st_makepointm(double precision, double precision, double precision) to service_role;

