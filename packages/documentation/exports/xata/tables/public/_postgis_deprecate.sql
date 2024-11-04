create function _postgis_deprecate(oldname text, newname text, version text) returns void
    immutable
    strict
    cost 500
    language plpgsql
as
$$
DECLARE
  curver_text text;
BEGIN
  --
  -- Raises a NOTICE if it was deprecated in this version,
  -- a WARNING if in a previous version (only up to minor version checked)
  --
	curver_text := '3.3.2';
	IF pg_catalog.split_part(curver_text,'.',1)::int > pg_catalog.split_part(version,'.',1)::int OR
	   ( pg_catalog.split_part(curver_text,'.',1) = pg_catalog.split_part(version,'.',1) AND
		 pg_catalog.split_part(curver_text,'.',2) != split_part(version,'.',2) )
	THEN
	  RAISE WARNING '% signature was deprecated in %. Please use %', oldname, version, newname;
	ELSE
	  RAISE DEBUG '% signature was deprecated in %. Please use %', oldname, version, newname;
	END IF;
END;
$$;

alter function _postgis_deprecate(text, text, text) owner to supabase_admin;

grant execute on function _postgis_deprecate(text, text, text) to postgres;

grant execute on function _postgis_deprecate(text, text, text) to anon;

grant execute on function _postgis_deprecate(text, text, text) to authenticated;

grant execute on function _postgis_deprecate(text, text, text) to service_role;

