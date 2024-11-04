create function checkauth(text, text, text) returns integer
    language plpgsql
as
$$
DECLARE
	schema text;
BEGIN
	IF NOT LongTransactionsEnabled() THEN
		RAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';
	END IF;

	if ( $1 != '' ) THEN
		schema = $1;
	ELSE
		SELECT current_schema() into schema;
	END IF;

	-- TODO: check for an already existing trigger ?

	EXECUTE 'CREATE TRIGGER check_auth BEFORE UPDATE OR DELETE ON '
		|| quote_ident(schema) || '.' || quote_ident($2)
		||' FOR EACH ROW EXECUTE PROCEDURE CheckAuthTrigger('
		|| quote_literal($3) || ')';

	RETURN 0;
END;
$$;

comment on function checkauth(text, text, text) is 'args: a_schema_name, a_table_name, a_key_column_name - Creates a trigger on a table to prevent/allow updates and deletes of rows based on authorization token.';

alter function checkauth(text, text, text) owner to supabase_admin;

grant execute on function checkauth(text, text, text) to postgres;

grant execute on function checkauth(text, text, text) to anon;

grant execute on function checkauth(text, text, text) to authenticated;

grant execute on function checkauth(text, text, text) to service_role;

create function checkauth(text, text) returns integer
    language sql
as
$$ SELECT CheckAuth('', $1, $2) $$;

comment on function checkauth(text, text) is 'args: a_table_name, a_key_column_name - Creates a trigger on a table to prevent/allow updates and deletes of rows based on authorization token.';

alter function checkauth(text, text) owner to supabase_admin;

grant execute on function checkauth(text, text) to postgres;

grant execute on function checkauth(text, text) to anon;

grant execute on function checkauth(text, text) to authenticated;

grant execute on function checkauth(text, text) to service_role;

