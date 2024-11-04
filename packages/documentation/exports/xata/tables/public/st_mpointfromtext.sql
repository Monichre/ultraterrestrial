create function st_mpointfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1, $2)) = 'MULTIPOINT'
	THEN ST_GeomFromText($1, $2)
	ELSE NULL END
	$$;

alter function st_mpointfromtext(text, integer) owner to supabase_admin;

grant execute on function st_mpointfromtext(text, integer) to postgres;

grant execute on function st_mpointfromtext(text, integer) to anon;

grant execute on function st_mpointfromtext(text, integer) to authenticated;

grant execute on function st_mpointfromtext(text, integer) to service_role;

create function st_mpointfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromText($1)) = 'MULTIPOINT'
	THEN public.ST_GeomFromText($1)
	ELSE NULL END
	$$;

alter function st_mpointfromtext(text) owner to supabase_admin;

grant execute on function st_mpointfromtext(text) to postgres;

grant execute on function st_mpointfromtext(text) to anon;

grant execute on function st_mpointfromtext(text) to authenticated;

grant execute on function st_mpointfromtext(text) to service_role;

