create function st_ashexewkb(geometry) returns text
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

alter function st_ashexewkb(geometry) owner to supabase_admin;

grant execute on function st_ashexewkb(geometry) to postgres;

grant execute on function st_ashexewkb(geometry) to anon;

grant execute on function st_ashexewkb(geometry) to authenticated;

grant execute on function st_ashexewkb(geometry) to service_role;

create function st_ashexewkb(geometry, text) returns text
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

alter function st_ashexewkb(geometry, text) owner to supabase_admin;

grant execute on function st_ashexewkb(geometry, text) to postgres;

grant execute on function st_ashexewkb(geometry, text) to anon;

grant execute on function st_ashexewkb(geometry, text) to authenticated;

grant execute on function st_ashexewkb(geometry, text) to service_role;

