create function st_geogfromtext(text) returns geography
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

alter function st_geogfromtext(text) owner to supabase_admin;

grant execute on function st_geogfromtext(text) to postgres;

grant execute on function st_geogfromtext(text) to anon;

grant execute on function st_geogfromtext(text) to authenticated;

grant execute on function st_geogfromtext(text) to service_role;

