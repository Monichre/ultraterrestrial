create function st_minimumboundingradius(geometry, out center geometry, out radius double precision) returns record
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

comment on function st_minimumboundingradius(geometry, out geometry, out double precision) is 'args: geom - Returns the center point and radius of the smallest circle that contains a geometry.';

alter function st_minimumboundingradius(geometry, out geometry, out double precision) owner to supabase_admin;

grant execute on function st_minimumboundingradius(geometry, out geometry, out double precision) to postgres;

grant execute on function st_minimumboundingradius(geometry, out geometry, out double precision) to anon;

grant execute on function st_minimumboundingradius(geometry, out geometry, out double precision) to authenticated;

grant execute on function st_minimumboundingradius(geometry, out geometry, out double precision) to service_role;

