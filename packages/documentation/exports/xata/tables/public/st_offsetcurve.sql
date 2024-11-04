create function st_offsetcurve(line geometry, distance double precision, params text default ''::text) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_offsetcurve(geometry, double precision, text) is 'args: line, signed_distance, style_parameters='' - Returns an offset line at a given distance and side from an input line.';

alter function st_offsetcurve(geometry, double precision, text) owner to supabase_admin;

grant execute on function st_offsetcurve(geometry, double precision, text) to postgres;

grant execute on function st_offsetcurve(geometry, double precision, text) to anon;

grant execute on function st_offsetcurve(geometry, double precision, text) to authenticated;

grant execute on function st_offsetcurve(geometry, double precision, text) to service_role;

