create function _st_geomfromgml(text, integer) returns geometry
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

alter function _st_geomfromgml(text, integer) owner to supabase_admin;

grant execute on function _st_geomfromgml(text, integer) to postgres;

grant execute on function _st_geomfromgml(text, integer) to anon;

grant execute on function _st_geomfromgml(text, integer) to authenticated;

grant execute on function _st_geomfromgml(text, integer) to service_role;

