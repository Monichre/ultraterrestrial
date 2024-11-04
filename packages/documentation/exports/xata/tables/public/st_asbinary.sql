create function st_asbinary(geometry, text) returns bytea
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

alter function st_asbinary(geometry, text) owner to supabase_admin;

grant execute on function st_asbinary(geometry, text) to postgres;

grant execute on function st_asbinary(geometry, text) to anon;

grant execute on function st_asbinary(geometry, text) to authenticated;

grant execute on function st_asbinary(geometry, text) to service_role;

create function st_asbinary(geometry) returns bytea
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

alter function st_asbinary(geometry) owner to supabase_admin;

grant execute on function st_asbinary(geometry) to postgres;

grant execute on function st_asbinary(geometry) to anon;

grant execute on function st_asbinary(geometry) to authenticated;

grant execute on function st_asbinary(geometry) to service_role;

create function st_asbinary(geography) returns bytea
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

alter function st_asbinary(geography) owner to supabase_admin;

grant execute on function st_asbinary(geography) to postgres;

grant execute on function st_asbinary(geography) to anon;

grant execute on function st_asbinary(geography) to authenticated;

grant execute on function st_asbinary(geography) to service_role;

create function st_asbinary(geography, text) returns bytea
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_asbinary(geography, text) owner to supabase_admin;

grant execute on function st_asbinary(geography, text) to postgres;

grant execute on function st_asbinary(geography, text) to anon;

grant execute on function st_asbinary(geography, text) to authenticated;

grant execute on function st_asbinary(geography, text) to service_role;

