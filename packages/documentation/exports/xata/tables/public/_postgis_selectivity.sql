create function _postgis_selectivity(tbl regclass, att_name text, geom geometry, mode text default '2'::text) returns double precision
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _postgis_selectivity(regclass, text, geometry, text) owner to supabase_admin;

grant execute on function _postgis_selectivity(regclass, text, geometry, text) to postgres;

grant execute on function _postgis_selectivity(regclass, text, geometry, text) to anon;

grant execute on function _postgis_selectivity(regclass, text, geometry, text) to authenticated;

grant execute on function _postgis_selectivity(regclass, text, geometry, text) to service_role;

