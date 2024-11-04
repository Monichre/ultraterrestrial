create function st_linestringfromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1, $2)) = 'LINESTRING'
	THEN public.ST_GeomFromWKB($1, $2)
	ELSE NULL END
	$$;

alter function st_linestringfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_linestringfromwkb(bytea, integer) to postgres;

grant execute on function st_linestringfromwkb(bytea, integer) to anon;

grant execute on function st_linestringfromwkb(bytea, integer) to authenticated;

grant execute on function st_linestringfromwkb(bytea, integer) to service_role;

create function st_linestringfromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'LINESTRING'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_linestringfromwkb(bytea) owner to supabase_admin;

grant execute on function st_linestringfromwkb(bytea) to postgres;

grant execute on function st_linestringfromwkb(bytea) to anon;

grant execute on function st_linestringfromwkb(bytea) to authenticated;

grant execute on function st_linestringfromwkb(bytea) to service_role;

