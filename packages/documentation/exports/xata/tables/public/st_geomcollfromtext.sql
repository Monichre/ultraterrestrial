create function st_geomcollfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE
	WHEN public.geometrytype(public.ST_GeomFromText($1, $2)) = 'GEOMETRYCOLLECTION'
	THEN public.ST_GeomFromText($1,$2)
	ELSE NULL END
	$$;

alter function st_geomcollfromtext(text, integer) owner to supabase_admin;

grant execute on function st_geomcollfromtext(text, integer) to postgres;

grant execute on function st_geomcollfromtext(text, integer) to anon;

grant execute on function st_geomcollfromtext(text, integer) to authenticated;

grant execute on function st_geomcollfromtext(text, integer) to service_role;

create function st_geomcollfromtext(text) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$
	SELECT CASE
	WHEN public.geometrytype(public.ST_GeomFromText($1)) = 'GEOMETRYCOLLECTION'
	THEN public.ST_GeomFromText($1)
	ELSE NULL END
	$$;

alter function st_geomcollfromtext(text) owner to supabase_admin;

grant execute on function st_geomcollfromtext(text) to postgres;

grant execute on function st_geomcollfromtext(text) to anon;

grant execute on function st_geomcollfromtext(text) to authenticated;

grant execute on function st_geomcollfromtext(text) to service_role;

