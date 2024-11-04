create function st_bdmpolyfromtext(text, integer) returns geometry
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

	geom := public.ST_Multi(public.ST_BuildArea(mline));

	RETURN geom;
END;
$$;

alter function st_bdmpolyfromtext(text, integer) owner to supabase_admin;

grant execute on function st_bdmpolyfromtext(text, integer) to postgres;

grant execute on function st_bdmpolyfromtext(text, integer) to anon;

grant execute on function st_bdmpolyfromtext(text, integer) to authenticated;

grant execute on function st_bdmpolyfromtext(text, integer) to service_role;

