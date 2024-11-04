create function jsonb(geometry) returns jsonb
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

alter function jsonb(geometry) owner to supabase_admin;

grant execute on function jsonb(geometry) to postgres;

grant execute on function jsonb(geometry) to anon;

grant execute on function jsonb(geometry) to authenticated;

grant execute on function jsonb(geometry) to service_role;

