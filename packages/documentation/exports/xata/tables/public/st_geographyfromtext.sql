create function st_geographyfromtext(text) returns geography
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

alter function st_geographyfromtext(text) owner to supabase_admin;

grant execute on function st_geographyfromtext(text) to postgres;

grant execute on function st_geographyfromtext(text) to anon;

grant execute on function st_geographyfromtext(text) to authenticated;

grant execute on function st_geographyfromtext(text) to service_role;

