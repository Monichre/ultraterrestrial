create function st_geomfromewkb(bytea) returns geometry
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

alter function st_geomfromewkb(bytea) owner to supabase_admin;

grant execute on function st_geomfromewkb(bytea) to postgres;

grant execute on function st_geomfromewkb(bytea) to anon;

grant execute on function st_geomfromewkb(bytea) to authenticated;

grant execute on function st_geomfromewkb(bytea) to service_role;

