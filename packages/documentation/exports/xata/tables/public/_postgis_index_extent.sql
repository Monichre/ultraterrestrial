create function _postgis_index_extent(tbl regclass, col text) returns box2d
    stable
    strict
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _postgis_index_extent(regclass, text) owner to supabase_admin;

grant execute on function _postgis_index_extent(regclass, text) to postgres;

grant execute on function _postgis_index_extent(regclass, text) to anon;

grant execute on function _postgis_index_extent(regclass, text) to authenticated;

grant execute on function _postgis_index_extent(regclass, text) to service_role;

