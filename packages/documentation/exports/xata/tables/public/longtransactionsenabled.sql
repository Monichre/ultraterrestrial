create function longtransactionsenabled() returns boolean
    language plpgsql
as
$$
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN SELECT oid FROM pg_class WHERE relname = 'authorized_tables'
	LOOP
		return 't';
	END LOOP;
	return 'f';
END;
$$;

alter function longtransactionsenabled() owner to supabase_admin;

grant execute on function longtransactionsenabled() to postgres;

grant execute on function longtransactionsenabled() to anon;

grant execute on function longtransactionsenabled() to authenticated;

grant execute on function longtransactionsenabled() to service_role;

