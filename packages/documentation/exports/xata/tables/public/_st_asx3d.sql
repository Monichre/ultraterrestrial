create function _st_asx3d(integer, geometry, integer, integer, text) returns text
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

alter function _st_asx3d(integer, geometry, integer, integer, text) owner to supabase_admin;

grant execute on function _st_asx3d(integer, geometry, integer, integer, text) to postgres;

grant execute on function _st_asx3d(integer, geometry, integer, integer, text) to anon;

grant execute on function _st_asx3d(integer, geometry, integer, integer, text) to authenticated;

grant execute on function _st_asx3d(integer, geometry, integer, integer, text) to service_role;

