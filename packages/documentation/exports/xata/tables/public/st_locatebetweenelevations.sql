create function st_locatebetweenelevations(geometry geometry, fromelevation double precision, toelevation double precision) returns geometry
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

comment on function st_locatebetweenelevations(geometry, double precision, double precision) is 'args: geom, elevation_start, elevation_end - Returns the portions of a geometry that lie in an elevation (Z) range.';

alter function st_locatebetweenelevations(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_locatebetweenelevations(geometry, double precision, double precision) to postgres;

grant execute on function st_locatebetweenelevations(geometry, double precision, double precision) to anon;

grant execute on function st_locatebetweenelevations(geometry, double precision, double precision) to authenticated;

grant execute on function st_locatebetweenelevations(geometry, double precision, double precision) to service_role;

