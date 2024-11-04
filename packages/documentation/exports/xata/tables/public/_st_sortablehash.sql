create function _st_sortablehash(geom geometry) returns bigint
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

alter function _st_sortablehash(geometry) owner to supabase_admin;

grant execute on function _st_sortablehash(geometry) to postgres;

grant execute on function _st_sortablehash(geometry) to anon;

grant execute on function _st_sortablehash(geometry) to authenticated;

grant execute on function _st_sortablehash(geometry) to service_role;

