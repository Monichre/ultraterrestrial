create function st_mpolyfromwkb(bytea, integer) returns geometry
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

alter function st_mpolyfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_mpolyfromwkb(bytea, integer) to postgres;

grant execute on function st_mpolyfromwkb(bytea, integer) to anon;

grant execute on function st_mpolyfromwkb(bytea, integer) to authenticated;

grant execute on function st_mpolyfromwkb(bytea, integer) to service_role;

create function st_mpolyfromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'MULTIPOLYGON'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_mpolyfromwkb(bytea) owner to supabase_admin;

grant execute on function st_mpolyfromwkb(bytea) to postgres;

grant execute on function st_mpolyfromwkb(bytea) to anon;

grant execute on function st_mpolyfromwkb(bytea) to authenticated;

grant execute on function st_mpolyfromwkb(bytea) to service_role;

