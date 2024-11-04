create function st_polyfromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1, $2)) = 'POLYGON'
	THEN public.ST_GeomFromWKB($1, $2)
	ELSE NULL END
	$$;

alter function st_polyfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_polyfromwkb(bytea, integer) to postgres;

grant execute on function st_polyfromwkb(bytea, integer) to anon;

grant execute on function st_polyfromwkb(bytea, integer) to authenticated;

grant execute on function st_polyfromwkb(bytea, integer) to service_role;

create function st_polyfromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'POLYGON'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_polyfromwkb(bytea) owner to supabase_admin;

grant execute on function st_polyfromwkb(bytea) to postgres;

grant execute on function st_polyfromwkb(bytea) to anon;

grant execute on function st_polyfromwkb(bytea) to authenticated;

grant execute on function st_polyfromwkb(bytea) to service_role;

