create function _postgis_join_selectivity(regclass, text, regclass, text, text default '2'::text) returns double precision
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _postgis_join_selectivity(regclass, text, regclass, text, text) owner to supabase_admin;

grant execute on function _postgis_join_selectivity(regclass, text, regclass, text, text) to postgres;

grant execute on function _postgis_join_selectivity(regclass, text, regclass, text, text) to anon;

grant execute on function _postgis_join_selectivity(regclass, text, regclass, text, text) to authenticated;

grant execute on function _postgis_join_selectivity(regclass, text, regclass, text, text) to service_role;
