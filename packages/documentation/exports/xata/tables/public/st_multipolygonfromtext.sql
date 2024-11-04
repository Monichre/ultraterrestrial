create function st_multipolygonfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_MPolyFromText($1, $2)$$;

alter function st_multipolygonfromtext(text, integer) owner to supabase_admin;

grant execute on function st_multipolygonfromtext(text, integer) to postgres;

grant execute on function st_multipolygonfromtext(text, integer) to anon;

grant execute on function st_multipolygonfromtext(text, integer) to authenticated;

grant execute on function st_multipolygonfromtext(text, integer) to service_role;

create function st_multipolygonfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_MPolyFromText($1)$$;

alter function st_multipolygonfromtext(text) owner to supabase_admin;

grant execute on function st_multipolygonfromtext(text) to postgres;

grant execute on function st_multipolygonfromtext(text) to anon;

grant execute on function st_multipolygonfromtext(text) to authenticated;

grant execute on function st_multipolygonfromtext(text) to service_role;

