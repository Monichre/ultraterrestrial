create function st_wrapx(geom geometry, wrap double precision, move double precision) returns geometry
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

comment on function st_wrapx(geometry, double precision, double precision) is 'args: geom, wrap, move - Wrap a geometry around an X value.';

alter function st_wrapx(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_wrapx(geometry, double precision, double precision) to postgres;

grant execute on function st_wrapx(geometry, double precision, double precision) to anon;

grant execute on function st_wrapx(geometry, double precision, double precision) to authenticated;

grant execute on function st_wrapx(geometry, double precision, double precision) to service_role;

