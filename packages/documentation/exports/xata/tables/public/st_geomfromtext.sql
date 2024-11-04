create function st_geomfromtext(text) returns geometry
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

alter function st_geomfromtext(text) owner to supabase_admin;

grant execute on function st_geomfromtext(text) to postgres;

grant execute on function st_geomfromtext(text) to anon;

grant execute on function st_geomfromtext(text) to authenticated;

grant execute on function st_geomfromtext(text) to service_role;

create function st_geomfromtext(text, integer) returns geometry
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

alter function st_geomfromtext(text, integer) owner to supabase_admin;

grant execute on function st_geomfromtext(text, integer) to postgres;

grant execute on function st_geomfromtext(text, integer) to anon;

grant execute on function st_geomfromtext(text, integer) to authenticated;

grant execute on function st_geomfromtext(text, integer) to service_role;

