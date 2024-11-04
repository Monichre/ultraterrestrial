create function postgis_addbbox(geometry) returns geometry
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

comment on function postgis_addbbox(geometry) is 'args: geomA - Add bounding box to the geometry.';

alter function postgis_addbbox(geometry) owner to supabase_admin;

grant execute on function postgis_addbbox(geometry) to postgres;

grant execute on function postgis_addbbox(geometry) to anon;

grant execute on function postgis_addbbox(geometry) to authenticated;

grant execute on function postgis_addbbox(geometry) to service_role;

