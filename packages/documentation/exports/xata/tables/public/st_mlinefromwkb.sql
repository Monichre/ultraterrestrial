create function st_mlinefromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1, $2)) = 'MULTILINESTRING'
	THEN public.ST_GeomFromWKB($1, $2)
	ELSE NULL END
	$$;

alter function st_mlinefromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_mlinefromwkb(bytea, integer) to postgres;

grant execute on function st_mlinefromwkb(bytea, integer) to anon;

grant execute on function st_mlinefromwkb(bytea, integer) to authenticated;

grant execute on function st_mlinefromwkb(bytea, integer) to service_role;

create function st_mlinefromwkb(bytea) returns geometry
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

alter function st_mlinefromwkb(bytea) owner to supabase_admin;

grant execute on function st_mlinefromwkb(bytea) to postgres;

grant execute on function st_mlinefromwkb(bytea) to anon;

grant execute on function st_mlinefromwkb(bytea) to authenticated;

grant execute on function st_mlinefromwkb(bytea) to service_role;

