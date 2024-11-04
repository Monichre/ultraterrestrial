create function st_geomfromewkt(text) returns geometry
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

alter function st_geomfromewkt(text) owner to supabase_admin;

grant execute on function st_geomfromewkt(text) to postgres;

grant execute on function st_geomfromewkt(text) to anon;

grant execute on function st_geomfromewkt(text) to authenticated;

grant execute on function st_geomfromewkt(text) to service_role;

