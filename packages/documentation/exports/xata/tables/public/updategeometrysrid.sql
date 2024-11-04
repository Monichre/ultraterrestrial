create function updategeometrysrid(catalogn_name character varying, schema_name character varying, table_name character varying, column_name character varying, new_srid_in integer) returns text
    strict
    language plpgsql
as
$$
DECLARE
	myrec RECORD;
	okay boolean;
	cname varchar;
	real_schema name;
	unknown_srid integer;
	new_srid integer := new_srid_in;

BEGIN

	-- Find, check or fix schema_name
	IF ( schema_name != '' ) THEN
		okay = false;

		FOR myrec IN SELECT nspname FROM pg_namespace WHERE text(nspname) = schema_name LOOP
			okay := true;
		END LOOP;

		IF ( okay <> true ) THEN
			RAISE EXCEPTION 'Invalid schema name';
		ELSE
			real_schema = schema_name;
		END IF;
	ELSE
		SELECT INTO real_schema current_schema()::text;
	END IF;

	-- Ensure that column_name is in geometry_columns
	okay = false;
	FOR myrec IN SELECT type, coord_dimension FROM public.geometry_columns WHERE f_table_schema = text(real_schema) and f_table_name = table_name and f_geometry_column = column_name LOOP
		okay := true;
	END LOOP;
	IF (NOT okay) THEN
		RAISE EXCEPTION 'column not found in geometry_columns table';
		RETURN false;
	END IF;

	-- Ensure that new_srid is valid
	IF ( new_srid > 0 ) THEN
		IF ( SELECT count(*) = 0 from spatial_ref_sys where srid = new_srid ) THEN
			RAISE EXCEPTION 'invalid SRID: % not found in spatial_ref_sys', new_srid;
			RETURN false;
		END IF;
	ELSE
		unknown_srid := public.ST_SRID('POINT EMPTY'::public.geometry);
		IF ( new_srid != unknown_srid ) THEN
			new_srid := unknown_srid;
			RAISE NOTICE 'SRID value % converted to the officially unknown SRID value %', new_srid_in, new_srid;
		END IF;
	END IF;

	IF postgis_constraint_srid(real_schema, table_name, column_name) IS NOT NULL THEN
	-- srid was enforced with constraints before, keep it that way.
		-- Make up constraint name
		cname = 'enforce_srid_'  || column_name;

		-- Drop enforce_srid constraint
		EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) ||
			'.' || quote_ident(table_name) ||
			' DROP constraint ' || quote_ident(cname);

		-- Update geometries SRID
		EXECUTE 'UPDATE ' || quote_ident(real_schema) ||
			'.' || quote_ident(table_name) ||
			' SET ' || quote_ident(column_name) ||
			' = public.ST_SetSRID(' || quote_ident(column_name) ||
			', ' || new_srid::text || ')';

		-- Reset enforce_srid constraint
		EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) ||
			'.' || quote_ident(table_name) ||
			' ADD constraint ' || quote_ident(cname) ||
			' CHECK (st_srid(' || quote_ident(column_name) ||
			') = ' || new_srid::text || ')';
	ELSE
		-- We will use typmod to enforce if no srid constraints
		-- We are using postgis_type_name to lookup the new name
		-- (in case Paul changes his mind and flips geometry_columns to return old upper case name)
		EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) || '.' || quote_ident(table_name) ||
		' ALTER COLUMN ' || quote_ident(column_name) || ' TYPE  geometry(' || public.postgis_type_name(myrec.type, myrec.coord_dimension, true) || ', ' || new_srid::text || ') USING public.ST_SetSRID(' || quote_ident(column_name) || ',' || new_srid::text || ');' ;
	END IF;

	RETURN real_schema || '.' || table_name || '.' || column_name ||' SRID changed to ' || new_srid::text;

END;
$$;

comment on function updategeometrysrid(varchar, varchar, varchar, varchar, integer) is 'args: catalog_name, schema_name, table_name, column_name, srid - Updates the SRID of all features in a geometry column, and the table metadata.';

alter function updategeometrysrid(varchar, varchar, varchar, varchar, integer) owner to supabase_admin;

grant execute on function updategeometrysrid(varchar, varchar, varchar, varchar, integer) to postgres;

grant execute on function updategeometrysrid(varchar, varchar, varchar, varchar, integer) to anon;

grant execute on function updategeometrysrid(varchar, varchar, varchar, varchar, integer) to authenticated;

grant execute on function updategeometrysrid(varchar, varchar, varchar, varchar, integer) to service_role;

create function updategeometrysrid(character varying, character varying, character varying, integer) returns text
    strict
    language plpgsql
as
$$
DECLARE
	ret  text;
BEGIN
	SELECT public.UpdateGeometrySRID('',$1,$2,$3,$4) into ret;
	RETURN ret;
END;
$$;

comment on function updategeometrysrid(varchar, varchar, varchar, integer) is 'args: schema_name, table_name, column_name, srid - Updates the SRID of all features in a geometry column, and the table metadata.';

alter function updategeometrysrid(varchar, varchar, varchar, integer) owner to supabase_admin;

grant execute on function updategeometrysrid(varchar, varchar, varchar, integer) to postgres;

grant execute on function updategeometrysrid(varchar, varchar, varchar, integer) to anon;

grant execute on function updategeometrysrid(varchar, varchar, varchar, integer) to authenticated;

grant execute on function updategeometrysrid(varchar, varchar, varchar, integer) to service_role;

create function updategeometrysrid(character varying, character varying, integer) returns text
    strict
    language plpgsql
as
$$
DECLARE
	ret  text;
BEGIN
	SELECT public.UpdateGeometrySRID('','',$1,$2,$3) into ret;
	RETURN ret;
END;
$$;

comment on function updategeometrysrid(varchar, varchar, integer) is 'args: table_name, column_name, srid - Updates the SRID of all features in a geometry column, and the table metadata.';

alter function updategeometrysrid(varchar, varchar, integer) owner to supabase_admin;

grant execute on function updategeometrysrid(varchar, varchar, integer) to postgres;

grant execute on function updategeometrysrid(varchar, varchar, integer) to anon;

grant execute on function updategeometrysrid(varchar, varchar, integer) to authenticated;

grant execute on function updategeometrysrid(varchar, varchar, integer) to service_role;

