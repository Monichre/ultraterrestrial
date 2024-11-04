create function st_linetocurve(geometry geometry) returns geometry
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

comment on function st_linetocurve(geometry) is 'args: geomANoncircular - Converts a linear geometry to a curved geometry.';

alter function st_linetocurve(geometry) owner to supabase_admin;

grant execute on function st_linetocurve(geometry) to postgres;

grant execute on function st_linetocurve(geometry) to anon;

grant execute on function st_linetocurve(geometry) to authenticated;

grant execute on function st_linetocurve(geometry) to service_role;

