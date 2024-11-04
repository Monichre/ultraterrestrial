create function st_bdpolyfromtext(text, integer) returns geometry
    immutable
    strict
    parallel safe
    language plpgsql
as
$$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline public.geometry;
	geom public.geometry;
BEGIN
	mline := public.ST_MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := public.ST_BuildArea(mline);

	IF public.GeometryType(geom) != 'POLYGON'
	THEN
		RAISE EXCEPTION 'Input returns more then a single polygon, try using BdMPolyFromText instead';
	END IF;

	RETURN geom;
END;
$$;

alter function st_bdpolyfromtext(text, integer) owner to supabase_admin;

grant execute on function st_bdpolyfromtext(text, integer) to postgres;

grant execute on function st_bdpolyfromtext(text, integer) to anon;

grant execute on function st_bdpolyfromtext(text, integer) to authenticated;

grant execute on function st_bdpolyfromtext(text, integer) to service_role;

