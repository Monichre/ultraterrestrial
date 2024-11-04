create function st_geomcollfromwkb(bytea, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE
	WHEN public.geometrytype(public.ST_GeomFromWKB($1, $2)) = 'GEOMETRYCOLLECTION'
	THEN public.ST_GeomFromWKB($1, $2)
	ELSE NULL END
	$$;

alter function st_geomcollfromwkb(bytea, integer) owner to supabase_admin;

grant execute on function st_geomcollfromwkb(bytea, integer) to postgres;

grant execute on function st_geomcollfromwkb(bytea, integer) to anon;

grant execute on function st_geomcollfromwkb(bytea, integer) to authenticated;

grant execute on function st_geomcollfromwkb(bytea, integer) to service_role;

create function st_geomcollfromwkb(bytea) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE
	WHEN public.geometrytype(public.ST_GeomFromWKB($1)) = 'GEOMETRYCOLLECTION'
	THEN public.ST_GeomFromWKB($1)
	ELSE NULL END
	$$;

alter function st_geomcollfromwkb(bytea) owner to supabase_admin;

grant execute on function st_geomcollfromwkb(bytea) to postgres;

grant execute on function st_geomcollfromwkb(bytea) to anon;

grant execute on function st_geomcollfromwkb(bytea) to authenticated;

grant execute on function st_geomcollfromwkb(bytea) to service_role;

