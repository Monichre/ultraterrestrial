create function postgis_index_supportfn(internal) returns internal
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function postgis_index_supportfn(internal) owner to supabase_admin;

grant execute on function postgis_index_supportfn(internal) to postgres;

grant execute on function postgis_index_supportfn(internal) to anon;

grant execute on function postgis_index_supportfn(internal) to authenticated;

grant execute on function postgis_index_supportfn(internal) to service_role;

