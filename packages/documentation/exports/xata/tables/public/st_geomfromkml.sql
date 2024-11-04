create function st_geomfromkml(text) returns geometry
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

alter function st_geomfromkml(text) owner to supabase_admin;

grant execute on function st_geomfromkml(text) to postgres;

grant execute on function st_geomfromkml(text) to anon;

grant execute on function st_geomfromkml(text) to authenticated;

grant execute on function st_geomfromkml(text) to service_role;

