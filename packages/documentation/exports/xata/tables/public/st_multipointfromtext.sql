create function st_multipointfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_MPointFromText($1)$$;

alter function st_multipointfromtext(text) owner to supabase_admin;

grant execute on function st_multipointfromtext(text) to postgres;

grant execute on function st_multipointfromtext(text) to anon;

grant execute on function st_multipointfromtext(text) to authenticated;

grant execute on function st_multipointfromtext(text) to service_role;

