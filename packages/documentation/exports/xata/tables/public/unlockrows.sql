create function unlockrows(text) returns integer
    strict
    language plpgsql
as
$$
DECLARE
	ret int;
BEGIN

	IF NOT LongTransactionsEnabled() THEN
		RAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';
	END IF;

	EXECUTE 'DELETE FROM authorization_table where authid = ' ||
		quote_literal($1);

	GET DIAGNOSTICS ret = ROW_COUNT;

	RETURN ret;
END;
$$;

comment on function unlockrows(text) is 'args: auth_token - Removes all locks held by an authorization token.';

alter function unlockrows(text) owner to supabase_admin;

grant execute on function unlockrows(text) to postgres;

grant execute on function unlockrows(text) to anon;

grant execute on function unlockrows(text) to authenticated;

grant execute on function unlockrows(text) to service_role;

