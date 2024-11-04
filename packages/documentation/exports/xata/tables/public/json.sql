create function json(geometry) returns json
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function json(geometry) owner to supabase_admin;

grant execute on function json(geometry) to postgres;

grant execute on function json(geometry) to anon;

grant execute on function json(geometry) to authenticated;

grant execute on function json(geometry) to service_role;

