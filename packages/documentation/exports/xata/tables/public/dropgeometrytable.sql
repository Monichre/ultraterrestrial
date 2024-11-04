create function dropgeometrytable(catalog_name character varying, schema_name character varying, table_name character varying) returns text
    strict
    language plpgsql
as
$$
DECLARE
	real_schema name;

BEGIN

	IF ( schema_name = '' ) THEN
		SELECT current_schema() into real_schema;
	ELSE
		real_schema = schema_name;
	END IF;

	-- TODO: Should we warn if table doesn't exist probably instead just saying dropped
	-- Remove table
	EXECUTE 'DROP TABLE IF EXISTS '
		|| quote_ident(real_schema) || '.' ||
		quote_ident(table_name) || ' RESTRICT';

	RETURN
		real_schema || '.' ||
		table_name ||' dropped.';

END;
$$;

comment on function dropgeometrytable(varchar, varchar, varchar) is 'args: catalog_name, schema_name, table_name - Drops a table and all its references in geometry_columns.';

alter function dropgeometrytable(varchar, varchar, varchar) owner to supabase_admin;

grant execute on function dropgeometrytable(varchar, varchar, varchar) to postgres;

grant execute on function dropgeometrytable(varchar, varchar, varchar) to anon;

grant execute on function dropgeometrytable(varchar, varchar, varchar) to authenticated;

grant execute on function dropgeometrytable(varchar, varchar, varchar) to service_role;

create function dropgeometrytable(schema_name character varying, table_name character varying) returns text
    strict
    language sql
as
$$ SELECT public.DropGeometryTable('',$1,$2) $$;

comment on function dropgeometrytable(varchar, varchar) is 'args: schema_name, table_name - Drops a table and all its references in geometry_columns.';

alter function dropgeometrytable(varchar, varchar) owner to supabase_admin;

grant execute on function dropgeometrytable(varchar, varchar) to postgres;

grant execute on function dropgeometrytable(varchar, varchar) to anon;

grant execute on function dropgeometrytable(varchar, varchar) to authenticated;

grant execute on function dropgeometrytable(varchar, varchar) to service_role;

create function dropgeometrytable(table_name character varying) returns text
    strict
    language sql
as
$$ SELECT public.DropGeometryTable('','',$1) $$;

comment on function dropgeometrytable(varchar) is 'args: table_name - Drops a table and all its references in geometry_columns.';

alter function dropgeometrytable(varchar) owner to supabase_admin;

grant execute on function dropgeometrytable(varchar) to postgres;

grant execute on function dropgeometrytable(varchar) to anon;

grant execute on function dropgeometrytable(varchar) to authenticated;

grant execute on function dropgeometrytable(varchar) to service_role;

