create function st_geometryfromtext(text) returns geometry
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

alter function st_geometryfromtext(text) owner to supabase_admin;

grant execute on function st_geometryfromtext(text) to postgres;

grant execute on function st_geometryfromtext(text) to anon;

grant execute on function st_geometryfromtext(text) to authenticated;

grant execute on function st_geometryfromtext(text) to service_role;

create function st_geometryfromtext(text, integer) returns geometry
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

alter function st_geometryfromtext(text, integer) owner to supabase_admin;

grant execute on function st_geometryfromtext(text, integer) to postgres;

grant execute on function st_geometryfromtext(text, integer) to anon;

grant execute on function st_geometryfromtext(text, integer) to authenticated;

grant execute on function st_geometryfromtext(text, integer) to service_role;

