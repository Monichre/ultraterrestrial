create function dropgeometrycolumn(catalog_name character varying, schema_name character varying, table_name character varying, column_name character varying) returns text
    strict
    language plpgsql
as
$$
DECLARE
	myrec RECORD;
	okay boolean;
	real_schema name;

BEGIN

	-- Find, check or fix schema_name
	IF ( schema_name != '' ) THEN
		okay = false;

		FOR myrec IN SELECT nspname FROM pg_namespace WHERE text(nspname) = schema_name LOOP
			okay := true;
		END LOOP;

		IF ( okay <>  true ) THEN
			RAISE NOTICE 'Invalid schema name - using current_schema()';
			SELECT current_schema() into real_schema;
		ELSE
			real_schema = schema_name;
		END IF;
	ELSE
		SELECT current_schema() into real_schema;
	END IF;

	-- Find out if the column is in the geometry_columns table
	okay = false;
	FOR myrec IN SELECT * from public.geometry_columns where f_table_schema = text(real_schema) and f_table_name = table_name and f_geometry_column = column_name LOOP
		okay := true;
	END LOOP;
	IF (okay <> true) THEN
		RAISE EXCEPTION 'column not found in geometry_columns table';
		RETURN false;
	END IF;

	-- Remove table column
	EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) || '.' ||
		quote_ident(table_name) || ' DROP COLUMN ' ||
		quote_ident(column_name);

	RETURN real_schema || '.' || table_name || '.' || column_name ||' effectively removed.';

END;
$$;

comment on function dropgeometrycolumn(varchar, varchar, varchar, varchar) is 'args: catalog_name, schema_name, table_name, column_name - Removes a geometry column from a spatial table.';

alter function dropgeometrycolumn(varchar, varchar, varchar, varchar) owner to supabase_admin;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar, varchar) to postgres;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar, varchar) to anon;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar, varchar) to authenticated;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar, varchar) to service_role;

create function dropgeometrycolumn(schema_name character varying, table_name character varying, column_name character varying) returns text
    strict
    language plpgsql
as
$$
DECLARE
	ret text;
BEGIN
	SELECT public.DropGeometryColumn('',$1,$2,$3) into ret;
	RETURN ret;
END;
$$;

comment on function dropgeometrycolumn(varchar, varchar, varchar) is 'args: schema_name, table_name, column_name - Removes a geometry column from a spatial table.';

alter function dropgeometrycolumn(varchar, varchar, varchar) owner to supabase_admin;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar) to postgres;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar) to anon;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar) to authenticated;

grant execute on function dropgeometrycolumn(varchar, varchar, varchar) to service_role;

create function dropgeometrycolumn(table_name character varying, column_name character varying) returns text
    strict
    language plpgsql
as
$$
DECLARE
	ret text;
BEGIN
	SELECT public.DropGeometryColumn('','',$1,$2) into ret;
	RETURN ret;
END;
$$;

comment on function dropgeometrycolumn(varchar, varchar) is 'args: table_name, column_name - Removes a geometry column from a spatial table.';

alter function dropgeometrycolumn(varchar, varchar) owner to supabase_admin;

grant execute on function dropgeometrycolumn(varchar, varchar) to postgres;

grant execute on function dropgeometrycolumn(varchar, varchar) to anon;

grant execute on function dropgeometrycolumn(varchar, varchar) to authenticated;

grant execute on function dropgeometrycolumn(varchar, varchar) to service_role;

