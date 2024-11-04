create function st_aslatlontext(geom geometry, tmpl text default ''::text) returns text
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

alter function st_aslatlontext(geometry, text) owner to supabase_admin;

grant execute on function st_aslatlontext(geometry, text) to postgres;

grant execute on function st_aslatlontext(geometry, text) to anon;

grant execute on function st_aslatlontext(geometry, text) to authenticated;

grant execute on function st_aslatlontext(geometry, text) to service_role;

