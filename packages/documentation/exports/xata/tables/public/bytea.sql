create function bytea(geometry) returns bytea
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

alter function bytea(geometry) owner to supabase_admin;

grant execute on function bytea(geometry) to postgres;

grant execute on function bytea(geometry) to anon;

grant execute on function bytea(geometry) to authenticated;

grant execute on function bytea(geometry) to service_role;

create function bytea(geography) returns bytea
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function bytea(geography) owner to supabase_admin;

grant execute on function bytea(geography) to postgres;

grant execute on function bytea(geography) to anon;

grant execute on function bytea(geography) to authenticated;

grant execute on function bytea(geography) to service_role;

