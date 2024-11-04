create function st_3dlineinterpolatepoint(geometry, double precision) returns geometry
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

comment on function st_3dlineinterpolatepoint(geometry, double precision) is 'args: a_linestring, a_fraction - Returns a point interpolated along a 3D line at a fractional location.';

alter function st_3dlineinterpolatepoint(geometry, double precision) owner to supabase_admin;

grant execute on function st_3dlineinterpolatepoint(geometry, double precision) to postgres;

grant execute on function st_3dlineinterpolatepoint(geometry, double precision) to anon;

grant execute on function st_3dlineinterpolatepoint(geometry, double precision) to authenticated;

grant execute on function st_3dlineinterpolatepoint(geometry, double precision) to service_role;

