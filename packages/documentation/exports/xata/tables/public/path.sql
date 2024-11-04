create function path(geometry) returns path
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

alter function path(geometry) owner to supabase_admin;

grant execute on function path(geometry) to postgres;

grant execute on function path(geometry) to anon;

grant execute on function path(geometry) to authenticated;

grant execute on function path(geometry) to service_role;

