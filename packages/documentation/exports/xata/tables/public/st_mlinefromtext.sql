create function st_mlinefromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE
	WHEN public.geometrytype(public.ST_GeomFromText($1, $2)) = 'MULTILINESTRING'
	THEN public.ST_GeomFromText($1,$2)
	ELSE NULL END
	$$;

alter function st_mlinefromtext(text, integer) owner to supabase_admin;

grant execute on function st_mlinefromtext(text, integer) to postgres;

grant execute on function st_mlinefromtext(text, integer) to anon;

grant execute on function st_mlinefromtext(text, integer) to authenticated;

grant execute on function st_mlinefromtext(text, integer) to service_role;

create function st_mlinefromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1)) = 'MULTILINESTRING'
	THEN public.ST_GeomFromText($1)
	ELSE NULL END
	$$;

alter function st_mlinefromtext(text) owner to supabase_admin;

grant execute on function st_mlinefromtext(text) to postgres;

grant execute on function st_mlinefromtext(text) to anon;

grant execute on function st_mlinefromtext(text) to authenticated;

grant execute on function st_mlinefromtext(text) to service_role;

