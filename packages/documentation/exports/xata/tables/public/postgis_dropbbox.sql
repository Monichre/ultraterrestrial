create function postgis_dropbbox(geometry) returns geometry
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

comment on function postgis_dropbbox(geometry) is 'args: geomA - Drop the bounding box cache from the geometry.';

alter function postgis_dropbbox(geometry) owner to supabase_admin;

grant execute on function postgis_dropbbox(geometry) to postgres;

grant execute on function postgis_dropbbox(geometry) to anon;

grant execute on function postgis_dropbbox(geometry) to authenticated;

grant execute on function postgis_dropbbox(geometry) to service_role;

