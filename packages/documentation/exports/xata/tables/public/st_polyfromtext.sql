create function st_polyfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1)) = 'POLYGON'
	THEN public.ST_GeomFromText($1)
	ELSE NULL END
	$$;

alter function st_polyfromtext(text) owner to supabase_admin;

grant execute on function st_polyfromtext(text) to postgres;

grant execute on function st_polyfromtext(text) to anon;

grant execute on function st_polyfromtext(text) to authenticated;

grant execute on function st_polyfromtext(text) to service_role;

create function st_polyfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1, $2)) = 'POLYGON'
	THEN public.ST_GeomFromText($1, $2)
	ELSE NULL END
	$$;

alter function st_polyfromtext(text, integer) owner to supabase_admin;

grant execute on function st_polyfromtext(text, integer) to postgres;

grant execute on function st_polyfromtext(text, integer) to anon;

grant execute on function st_polyfromtext(text, integer) to authenticated;

grant execute on function st_polyfromtext(text, integer) to service_role;

