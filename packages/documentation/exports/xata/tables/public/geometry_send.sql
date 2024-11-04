create function geometry_send(geometry) returns bytea
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

alter function geometry_send(geometry) owner to supabase_admin;

grant execute on function geometry_send(geometry) to postgres;

grant execute on function geometry_send(geometry) to anon;

grant execute on function geometry_send(geometry) to authenticated;

grant execute on function geometry_send(geometry) to service_role;

