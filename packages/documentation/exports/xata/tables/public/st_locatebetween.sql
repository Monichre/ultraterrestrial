create function st_locatebetween(geometry geometry, frommeasure double precision, tomeasure double precision, leftrightoffset double precision default 0.0) returns geometry
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

comment on function st_locatebetween(geometry, double precision, double precision, double precision) is 'args: geom, measure_start, measure_end, offset = 0 - Returns the portions of a geometry that match a measure range.';

alter function st_locatebetween(geometry, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_locatebetween(geometry, double precision, double precision, double precision) to postgres;

grant execute on function st_locatebetween(geometry, double precision, double precision, double precision) to anon;

grant execute on function st_locatebetween(geometry, double precision, double precision, double precision) to authenticated;

grant execute on function st_locatebetween(geometry, double precision, double precision, double precision) to service_role;

