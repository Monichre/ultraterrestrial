create function st_mpolyfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1, $2)) = 'MULTIPOLYGON'
	THEN public.ST_GeomFromText($1,$2)
	ELSE NULL END
	$$;

alter function st_mpolyfromtext(text, integer) owner to supabase_admin;

grant execute on function st_mpolyfromtext(text, integer) to postgres;

grant execute on function st_mpolyfromtext(text, integer) to anon;

grant execute on function st_mpolyfromtext(text, integer) to authenticated;

grant execute on function st_mpolyfromtext(text, integer) to service_role;

create function st_mpolyfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1)) = 'MULTIPOLYGON'
	THEN public.ST_GeomFromText($1)
	ELSE NULL END
	$$;

alter function st_mpolyfromtext(text) owner to supabase_admin;

grant execute on function st_mpolyfromtext(text) to postgres;

grant execute on function st_mpolyfromtext(text) to anon;

grant execute on function st_mpolyfromtext(text) to authenticated;

grant execute on function st_mpolyfromtext(text) to service_role;

