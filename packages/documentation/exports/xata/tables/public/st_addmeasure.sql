create function st_addmeasure(geometry, double precision, double precision) returns geometry
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

comment on function st_addmeasure(geometry, double precision, double precision) is 'args: geom_mline, measure_start, measure_end - Interpolates measures along a linear geometry.';

alter function st_addmeasure(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_addmeasure(geometry, double precision, double precision) to postgres;

grant execute on function st_addmeasure(geometry, double precision, double precision) to anon;

grant execute on function st_addmeasure(geometry, double precision, double precision) to authenticated;

grant execute on function st_addmeasure(geometry, double precision, double precision) to service_role;

