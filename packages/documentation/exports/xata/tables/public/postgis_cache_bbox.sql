create function postgis_cache_bbox() returns trigger
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function postgis_cache_bbox() owner to supabase_admin;

grant execute on function postgis_cache_bbox() to postgres;

grant execute on function postgis_cache_bbox() to anon;

grant execute on function postgis_cache_bbox() to authenticated;

grant execute on function postgis_cache_bbox() to service_role;

