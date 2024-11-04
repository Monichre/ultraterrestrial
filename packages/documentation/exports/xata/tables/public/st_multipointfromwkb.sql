create function st_multipointfromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1,$2)) = 'MULTIPOINT'
	THEN public.ST_GeomFromWKB($1, $2)
	ELSE NULL END
	$$;

alter function st_multipointfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_multipointfromwkb(bytea, integer) to postgres;

grant execute on function st_multipointfromwkb(bytea, integer) to anon;

grant execute on function st_multipointfromwkb(bytea, integer) to authenticated;

grant execute on function st_multipointfromwkb(bytea, integer) to service_role;

create function st_multipointfromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'MULTIPOINT'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_multipointfromwkb(bytea) owner to supabase_admin;

grant execute on function st_multipointfromwkb(bytea) to postgres;

grant execute on function st_multipointfromwkb(bytea) to anon;

grant execute on function st_multipointfromwkb(bytea) to authenticated;

grant execute on function st_multipointfromwkb(bytea) to service_role;

