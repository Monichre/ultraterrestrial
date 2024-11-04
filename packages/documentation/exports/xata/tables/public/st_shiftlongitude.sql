create function st_shiftlongitude(geometry) returns geometry
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

comment on function st_shiftlongitude(geometry) is 'args: geom - Shifts the longitude coordinates of a geometry between -180..180 and 0..360.';

alter function st_shiftlongitude(geometry) owner to supabase_admin;

grant execute on function st_shiftlongitude(geometry) to postgres;

grant execute on function st_shiftlongitude(geometry) to anon;

grant execute on function st_shiftlongitude(geometry) to authenticated;

grant execute on function st_shiftlongitude(geometry) to service_role;

