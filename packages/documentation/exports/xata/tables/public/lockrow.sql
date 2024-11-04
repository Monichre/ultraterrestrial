create function lockrow(text, text, text, text, timestamp without time zone) returns integer
    strict
    language plpgsql
as
$$
DECLARE
	myschema alias for $1;
	mytable alias for $2;
	myrid   alias for $3;
	authid alias for $4;
	expires alias for $5;
	ret int;
	mytoid oid;
	myrec RECORD;

BEGIN

	IF NOT LongTransactionsEnabled() THEN
		RAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';
	END IF;

	EXECUTE 'DELETE FROM authorization_table WHERE expires < now()';

	SELECT c.oid INTO mytoid FROM pg_class c, pg_namespace n
		WHERE c.relname = mytable
		AND c.relnamespace = n.oid
		AND n.nspname = myschema;

	-- RAISE NOTICE 'toid: %', mytoid;

	FOR myrec IN SELECT * FROM authorization_table WHERE
		toid = mytoid AND rid = myrid
	LOOP
		IF myrec.authid != authid THEN
			RETURN 0;
		ELSE
			RETURN 1;
		END IF;
	END LOOP;

	EXECUTE 'INSERT INTO authorization_table VALUES ('||
		quote_literal(mytoid::text)||','||quote_literal(myrid)||
		','||quote_literal(expires::text)||
		','||quote_literal(authid) ||')';

	GET DIAGNOSTICS ret = ROW_COUNT;

	RETURN ret;
END;
$$;

comment on function lockrow(text, text, text, text, timestamp) is 'args: a_schema_name, a_table_name, a_row_key, an_auth_token, expire_dt - Sets lock/authorization for a row in a table.';

alter function lockrow(text, text, text, text, timestamp) owner to supabase_admin;

grant execute on function lockrow(text, text, text, text, timestamp) to postgres;

grant execute on function lockrow(text, text, text, text, timestamp) to anon;

grant execute on function lockrow(text, text, text, text, timestamp) to authenticated;

grant execute on function lockrow(text, text, text, text, timestamp) to service_role;

create function lockrow(text, text, text, text) returns integer
    strict
    language sql
as
$$ SELECT LockRow($1, $2, $3, $4, now()::timestamp+'1:00'); $$;

alter function lockrow(text, text, text, text) owner to supabase_admin;

grant execute on function lockrow(text, text, text, text) to postgres;

grant execute on function lockrow(text, text, text, text) to anon;

grant execute on function lockrow(text, text, text, text) to authenticated;

grant execute on function lockrow(text, text, text, text) to service_role;

create function lockrow(text, text, text) returns integer
    strict
    language sql
as
$$ SELECT LockRow(current_schema(), $1, $2, $3, now()::timestamp+'1:00'); $$;

comment on function lockrow(text, text, text) is 'args: a_table_name, a_row_key, an_auth_token - Sets lock/authorization for a row in a table.';

alter function lockrow(text, text, text) owner to supabase_admin;

grant execute on function lockrow(text, text, text) to postgres;

grant execute on function lockrow(text, text, text) to anon;

grant execute on function lockrow(text, text, text) to authenticated;

grant execute on function lockrow(text, text, text) to service_role;

create function lockrow(text, text, text, timestamp without time zone) returns integer
    strict
    language sql
as
$$ SELECT LockRow(current_schema(), $1, $2, $3, $4); $$;

comment on function lockrow(text, text, text, timestamp) is 'args: a_table_name, a_row_key, an_auth_token, expire_dt - Sets lock/authorization for a row in a table.';

alter function lockrow(text, text, text, timestamp) owner to supabase_admin;

grant execute on function lockrow(text, text, text, timestamp) to postgres;

grant execute on function lockrow(text, text, text, timestamp) to anon;

grant execute on function lockrow(text, text, text, timestamp) to authenticated;

grant execute on function lockrow(text, text, text, timestamp) to service_role;

