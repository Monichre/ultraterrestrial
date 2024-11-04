create function postgis_transform_geometry(geom geometry, text, text, integer) returns geometry
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

alter function postgis_transform_geometry(geometry, text, text, integer) owner to supabase_admin;

grant execute on function postgis_transform_geometry(geometry, text, text, integer) to postgres;

grant execute on function postgis_transform_geometry(geometry, text, text, integer) to anon;

grant execute on function postgis_transform_geometry(geometry, text, text, integer) to authenticated;

grant execute on function postgis_transform_geometry(geometry, text, text, integer) to service_role;

