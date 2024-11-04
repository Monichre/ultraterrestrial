create function st_lengthspheroid(geometry, spheroid) returns double precision
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

comment on function st_lengthspheroid(geometry, spheroid) is 'args: a_geometry, a_spheroid - Returns the 2D or 3D length/perimeter of a lon/lat geometry on a spheroid.';

alter function st_lengthspheroid(geometry, spheroid) owner to supabase_admin;

grant execute on function st_lengthspheroid(geometry, spheroid) to postgres;

grant execute on function st_lengthspheroid(geometry, spheroid) to anon;

grant execute on function st_lengthspheroid(geometry, spheroid) to authenticated;

grant execute on function st_lengthspheroid(geometry, spheroid) to service_role;

