create function postgis_constraint_type(geomschema text, geomtable text, geomcolumn text) returns character varying
    stable
    strict
    parallel safe
    cost 500
    language sql
as
$$
SELECT  replace(split_part(s.consrc, '''', 2), ')', '')::varchar
		 FROM pg_class c, pg_namespace n, pg_attribute a
		 , (SELECT connamespace, conrelid, conkey, pg_get_constraintdef(oid) As consrc
			FROM pg_constraint) AS s
		 WHERE n.nspname = $1
		 AND c.relname = $2
		 AND a.attname = $3
		 AND a.attrelid = c.oid
		 AND s.connamespace = n.oid
		 AND s.conrelid = c.oid
		 AND a.attnum = ANY (s.conkey)
		 AND s.consrc LIKE '%geometrytype(% = %';
$$;

alter function postgis_constraint_type(text, text, text) owner to supabase_admin;

grant execute on function postgis_constraint_type(text, text, text) to postgres;

grant execute on function postgis_constraint_type(text, text, text) to anon;

grant execute on function postgis_constraint_type(text, text, text) to authenticated;

grant execute on function postgis_constraint_type(text, text, text) to service_role;

