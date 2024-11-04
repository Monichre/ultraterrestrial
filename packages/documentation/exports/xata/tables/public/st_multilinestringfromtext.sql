create function st_multilinestringfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_MLineFromText($1)$$;

alter function st_multilinestringfromtext(text) owner to supabase_admin;

grant execute on function st_multilinestringfromtext(text) to postgres;

grant execute on function st_multilinestringfromtext(text) to anon;

grant execute on function st_multilinestringfromtext(text) to authenticated;

grant execute on function st_multilinestringfromtext(text) to service_role;

create function st_multilinestringfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_MLineFromText($1, $2)$$;

alter function st_multilinestringfromtext(text, integer) owner to supabase_admin;

grant execute on function st_multilinestringfromtext(text, integer) to postgres;

grant execute on function st_multilinestringfromtext(text, integer) to anon;

grant execute on function st_multilinestringfromtext(text, integer) to authenticated;

grant execute on function st_multilinestringfromtext(text, integer) to service_role;

