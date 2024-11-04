create function st_pointonsurface(geometry) returns geometry
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

comment on function st_pointonsurface(geometry) is 'args: g1 - Computes a point guaranteed to lie in a polygon, or on a geometry.';

alter function st_pointonsurface(geometry) owner to supabase_admin;

grant execute on function st_pointonsurface(geometry) to postgres;

grant execute on function st_pointonsurface(geometry) to anon;

grant execute on function st_pointonsurface(geometry) to authenticated;

grant execute on function st_pointonsurface(geometry) to service_role;

