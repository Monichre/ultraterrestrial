create function postgis_noop(geometry) returns geometry
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

alter function postgis_noop(geometry) owner to supabase_admin;

grant execute on function postgis_noop(geometry) to postgres;

grant execute on function postgis_noop(geometry) to anon;

grant execute on function postgis_noop(geometry) to authenticated;

grant execute on function postgis_noop(geometry) to service_role;

