create function st_linefromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1)) = 'LINESTRING'
	THEN public.ST_GeomFromText($1)
	ELSE NULL END
	$$;

alter function st_linefromtext(text) owner to supabase_admin;

grant execute on function st_linefromtext(text) to postgres;

grant execute on function st_linefromtext(text) to anon;

grant execute on function st_linefromtext(text) to authenticated;

grant execute on function st_linefromtext(text) to service_role;

create function st_linefromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1, $2)) = 'LINESTRING'
	THEN public.ST_GeomFromText($1,$2)
	ELSE NULL END
	$$;

alter function st_linefromtext(text, integer) owner to supabase_admin;

grant execute on function st_linefromtext(text, integer) to postgres;

grant execute on function st_linefromtext(text, integer) to anon;

grant execute on function st_linefromtext(text, integer) to authenticated;

grant execute on function st_linefromtext(text, integer) to service_role;

