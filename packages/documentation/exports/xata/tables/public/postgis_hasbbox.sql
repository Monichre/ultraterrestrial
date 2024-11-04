create function postgis_hasbbox(geometry) returns boolean
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

comment on function postgis_hasbbox(geometry) is 'args: geomA - Returns TRUE if the bbox of this geometry is cached, FALSE otherwise.';

alter function postgis_hasbbox(geometry) owner to supabase_admin;

grant execute on function postgis_hasbbox(geometry) to postgres;

grant execute on function postgis_hasbbox(geometry) to anon;

grant execute on function postgis_hasbbox(geometry) to authenticated;

grant execute on function postgis_hasbbox(geometry) to service_role;

