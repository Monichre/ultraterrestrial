create function _postgis_pgsql_version() returns text
    stable
    language sql
as
$$
	SELECT CASE WHEN pg_catalog.split_part(s,'.',1)::integer > 9 THEN pg_catalog.split_part(s,'.',1) || '0'
	ELSE pg_catalog.split_part(s,'.', 1) || pg_catalog.split_part(s,'.', 2) END AS v
	FROM pg_catalog.substring(version(), 'PostgreSQL ([0-9\.]+)') AS s;
$$;

alter function _postgis_pgsql_version() owner to supabase_admin;

grant execute on function _postgis_pgsql_version() to postgres;

grant execute on function _postgis_pgsql_version() to anon;

grant execute on function _postgis_pgsql_version() to authenticated;

grant execute on function _postgis_pgsql_version() to service_role;

