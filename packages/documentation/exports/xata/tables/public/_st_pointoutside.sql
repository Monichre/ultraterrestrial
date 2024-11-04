create function _st_pointoutside(geography) returns geography
    immutable
    strict
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _st_pointoutside(geography) owner to supabase_admin;

grant execute on function _st_pointoutside(geography) to postgres;

grant execute on function _st_pointoutside(geography) to anon;

grant execute on function _st_pointoutside(geography) to authenticated;

grant execute on function _st_pointoutside(geography) to service_role;

