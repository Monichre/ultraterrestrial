create function st_geomfromtwkb(bytea) returns geometry
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

alter function st_geomfromtwkb(bytea) owner to supabase_admin;

grant execute on function st_geomfromtwkb(bytea) to postgres;

grant execute on function st_geomfromtwkb(bytea) to anon;

grant execute on function st_geomfromtwkb(bytea) to authenticated;

grant execute on function st_geomfromtwkb(bytea) to service_role;

