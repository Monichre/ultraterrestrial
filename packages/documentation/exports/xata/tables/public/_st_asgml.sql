create function _st_asgml(integer, geometry, integer, integer, text, text) returns text
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _st_asgml(integer, geometry, integer, integer, text, text) owner to supabase_admin;

grant execute on function _st_asgml(integer, geometry, integer, integer, text, text) to postgres;

grant execute on function _st_asgml(integer, geometry, integer, integer, text, text) to anon;

grant execute on function _st_asgml(integer, geometry, integer, integer, text, text) to authenticated;

grant execute on function _st_asgml(integer, geometry, integer, integer, text, text) to service_role;

