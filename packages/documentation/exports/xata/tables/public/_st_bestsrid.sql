create function _st_bestsrid(geography, geography) returns integer
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

alter function _st_bestsrid(geography, geography) owner to supabase_admin;

grant execute on function _st_bestsrid(geography, geography) to postgres;

grant execute on function _st_bestsrid(geography, geography) to anon;

grant execute on function _st_bestsrid(geography, geography) to authenticated;

grant execute on function _st_bestsrid(geography, geography) to service_role;

create function _st_bestsrid(geography) returns integer
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

alter function _st_bestsrid(geography) owner to supabase_admin;

grant execute on function _st_bestsrid(geography) to postgres;

grant execute on function _st_bestsrid(geography) to anon;

grant execute on function _st_bestsrid(geography) to authenticated;

grant execute on function _st_bestsrid(geography) to service_role;

