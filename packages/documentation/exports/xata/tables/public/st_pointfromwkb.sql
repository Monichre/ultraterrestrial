create function st_pointfromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1, $2)) = 'POINT'
	THEN public.ST_GeomFromWKB($1, $2)
	ELSE NULL END
	$$;

alter function st_pointfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_pointfromwkb(bytea, integer) to postgres;

grant execute on function st_pointfromwkb(bytea, integer) to anon;

grant execute on function st_pointfromwkb(bytea, integer) to authenticated;

grant execute on function st_pointfromwkb(bytea, integer) to service_role;

create function st_pointfromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'POINT'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_pointfromwkb(bytea) owner to supabase_admin;

grant execute on function st_pointfromwkb(bytea) to postgres;

grant execute on function st_pointfromwkb(bytea) to anon;

grant execute on function st_pointfromwkb(bytea) to authenticated;

grant execute on function st_pointfromwkb(bytea) to service_role;

