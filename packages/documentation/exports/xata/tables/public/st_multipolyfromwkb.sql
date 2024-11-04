create function st_multipolyfromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1, $2)) = 'MULTIPOLYGON'
	THEN public.ST_GeomFromWKB($1, $2)
	ELSE NULL END
	$$;

alter function st_multipolyfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_multipolyfromwkb(bytea, integer) to postgres;

grant execute on function st_multipolyfromwkb(bytea, integer) to anon;

grant execute on function st_multipolyfromwkb(bytea, integer) to authenticated;

grant execute on function st_multipolyfromwkb(bytea, integer) to service_role;

create function st_multipolyfromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'MULTIPOLYGON'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_multipolyfromwkb(bytea) owner to supabase_admin;

grant execute on function st_multipolyfromwkb(bytea) to postgres;

grant execute on function st_multipolyfromwkb(bytea) to anon;

grant execute on function st_multipolyfromwkb(bytea) to authenticated;

grant execute on function st_multipolyfromwkb(bytea) to service_role;

