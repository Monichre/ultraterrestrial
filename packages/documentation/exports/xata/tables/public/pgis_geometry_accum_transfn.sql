create function pgis_geometry_accum_transfn(internal, geometry) returns internal
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_geometry_accum_transfn(internal, geometry) owner to supabase_admin;

grant execute on function pgis_geometry_accum_transfn(internal, geometry) to postgres;

grant execute on function pgis_geometry_accum_transfn(internal, geometry) to anon;

grant execute on function pgis_geometry_accum_transfn(internal, geometry) to authenticated;

grant execute on function pgis_geometry_accum_transfn(internal, geometry) to service_role;

create function pgis_geometry_accum_transfn(internal, geometry, double precision) returns internal
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_geometry_accum_transfn(internal, geometry, double precision) owner to supabase_admin;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision) to postgres;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision) to anon;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision) to authenticated;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision) to service_role;

create function pgis_geometry_accum_transfn(internal, geometry, double precision, integer) returns internal
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_geometry_accum_transfn(internal, geometry, double precision, integer) owner to supabase_admin;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision, integer) to postgres;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision, integer) to anon;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision, integer) to authenticated;

grant execute on function pgis_geometry_accum_transfn(internal, geometry, double precision, integer) to service_role;

