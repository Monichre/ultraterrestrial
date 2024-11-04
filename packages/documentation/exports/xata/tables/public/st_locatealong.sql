create function st_locatealong(geometry geometry, measure double precision, leftrightoffset double precision default 0.0) returns geometry
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

comment on function st_locatealong(geometry, double precision, double precision) is 'args: geom_with_measure, measure, offset = 0 - Returns the point(s) on a geometry that match a measure value.';

alter function st_locatealong(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_locatealong(geometry, double precision, double precision) to postgres;

grant execute on function st_locatealong(geometry, double precision, double precision) to anon;

grant execute on function st_locatealong(geometry, double precision, double precision) to authenticated;

grant execute on function st_locatealong(geometry, double precision, double precision) to service_role;

