create function st_geogfromwkb(bytea) returns geography
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

alter function st_geogfromwkb(bytea) owner to supabase_admin;

grant execute on function st_geogfromwkb(bytea) to postgres;

grant execute on function st_geogfromwkb(bytea) to anon;

grant execute on function st_geogfromwkb(bytea) to authenticated;

grant execute on function st_geogfromwkb(bytea) to service_role;

