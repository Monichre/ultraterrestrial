create function st_polygonfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_PolyFromText($1, $2)$$;

alter function st_polygonfromtext(text, integer) owner to supabase_admin;

grant execute on function st_polygonfromtext(text, integer) to postgres;

grant execute on function st_polygonfromtext(text, integer) to anon;

grant execute on function st_polygonfromtext(text, integer) to authenticated;

grant execute on function st_polygonfromtext(text, integer) to service_role;

create function st_polygonfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_PolyFromText($1)$$;

alter function st_polygonfromtext(text) owner to supabase_admin;

grant execute on function st_polygonfromtext(text) to postgres;

grant execute on function st_polygonfromtext(text) to anon;

grant execute on function st_polygonfromtext(text) to authenticated;

grant execute on function st_polygonfromtext(text) to service_role;

