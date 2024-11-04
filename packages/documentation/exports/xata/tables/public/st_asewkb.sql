create function st_asewkb(geometry) returns bytea
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

alter function st_asewkb(geometry) owner to supabase_admin;

grant execute on function st_asewkb(geometry) to postgres;

grant execute on function st_asewkb(geometry) to anon;

grant execute on function st_asewkb(geometry) to authenticated;

grant execute on function st_asewkb(geometry) to service_role;

create function st_asewkb(geometry, text) returns bytea
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

alter function st_asewkb(geometry, text) owner to supabase_admin;

grant execute on function st_asewkb(geometry, text) to postgres;

grant execute on function st_asewkb(geometry, text) to anon;

grant execute on function st_asewkb(geometry, text) to authenticated;

grant execute on function st_asewkb(geometry, text) to service_role;

