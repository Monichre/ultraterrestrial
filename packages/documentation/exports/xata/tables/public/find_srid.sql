create function find_srid(character varying, character varying, character varying) returns integer
    stable
    strict
    parallel safe
    language plpgsql
as
$$
DECLARE
	schem varchar =  $1;
	tabl varchar = $2;
	sr int4;
BEGIN
-- if the table contains a . and the schema is empty
-- split the table into a schema and a table
-- otherwise drop through to default behavior
	IF ( schem = '' and strpos(tabl,'.') > 0 ) THEN
	 schem = substr(tabl,1,strpos(tabl,'.')-1);
	 tabl = substr(tabl,length(schem)+2);
	END IF;

	select SRID into sr from public.geometry_columns where (f_table_schema = schem or schem = '') and f_table_name = tabl and f_geometry_column = $3;
	IF NOT FOUND THEN
	   RAISE EXCEPTION 'find_srid() - could not find the corresponding SRID - is the geometry registered in the GEOMETRY_COLUMNS table?  Is there an uppercase/lowercase mismatch?';
	END IF;
	return sr;
END;
$$;

comment on function find_srid(varchar, varchar, varchar) is 'args: a_schema_name, a_table_name, a_geomfield_name - Returns the SRID defined for a geometry column.';

alter function find_srid(varchar, varchar, varchar) owner to supabase_admin;

grant execute on function find_srid(varchar, varchar, varchar) to postgres;

grant execute on function find_srid(varchar, varchar, varchar) to anon;

grant execute on function find_srid(varchar, varchar, varchar) to authenticated;

grant execute on function find_srid(varchar, varchar, varchar) to service_role;

