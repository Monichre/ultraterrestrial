create function postgis_lib_build_date() returns text
    immutable
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function postgis_lib_build_date() is 'Returns build date of the PostGIS library.';

alter function postgis_lib_build_date() owner to supabase_admin;

grant execute on function postgis_lib_build_date() to postgres;

grant execute on function postgis_lib_build_date() to anon;

grant execute on function postgis_lib_build_date() to authenticated;

grant execute on function postgis_lib_build_date() to service_role;

