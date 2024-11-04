create function postgis_getbbox(geometry) returns box2d
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function postgis_getbbox(geometry) owner to supabase_admin;

grant execute on function postgis_getbbox(geometry) to postgres;

grant execute on function postgis_getbbox(geometry) to anon;

grant execute on function postgis_getbbox(geometry) to authenticated;

grant execute on function postgis_getbbox(geometry) to service_role;

