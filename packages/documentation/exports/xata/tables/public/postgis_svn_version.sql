create function postgis_svn_version() returns text
    immutable
    language sql
as
$$
	SELECT public._postgis_deprecate(
		'postgis_svn_version', 'postgis_lib_revision', '3.1.0');
	SELECT public.postgis_lib_revision();
$$;

alter function postgis_svn_version() owner to supabase_admin;

grant execute on function postgis_svn_version() to postgres;

grant execute on function postgis_svn_version() to anon;

grant execute on function postgis_svn_version() to authenticated;

grant execute on function postgis_svn_version() to service_role;

