create function st_multilinefromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'MULTILINESTRING'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_multilinefromwkb(bytea) owner to supabase_admin;

grant execute on function st_multilinefromwkb(bytea) to postgres;

grant execute on function st_multilinefromwkb(bytea) to anon;

grant execute on function st_multilinefromwkb(bytea) to authenticated;

grant execute on function st_multilinefromwkb(bytea) to service_role;

