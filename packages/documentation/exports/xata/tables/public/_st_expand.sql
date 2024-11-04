create function _st_expand(geography, double precision) returns geography
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function _st_expand(geography, double precision) owner to supabase_admin;

grant execute on function _st_expand(geography, double precision) to postgres;

grant execute on function _st_expand(geography, double precision) to anon;

grant execute on function _st_expand(geography, double precision) to authenticated;

grant execute on function _st_expand(geography, double precision) to service_role;

