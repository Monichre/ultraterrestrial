create function st_pointfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1)) = 'POINT'
	THEN public.ST_GeomFromText($1)
	ELSE NULL END
	$$;

alter function st_pointfromtext(text) owner to supabase_admin;

grant execute on function st_pointfromtext(text) to postgres;

grant execute on function st_pointfromtext(text) to anon;

grant execute on function st_pointfromtext(text) to authenticated;

grant execute on function st_pointfromtext(text) to service_role;

create function st_pointfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1, $2)) = 'POINT'
	THEN public.ST_GeomFromText($1, $2)
	ELSE NULL END
	$$;

alter function st_pointfromtext(text, integer) owner to supabase_admin;

grant execute on function st_pointfromtext(text, integer) to postgres;

grant execute on function st_pointfromtext(text, integer) to anon;

grant execute on function st_pointfromtext(text, integer) to authenticated;

grant execute on function st_pointfromtext(text, integer) to service_role;

