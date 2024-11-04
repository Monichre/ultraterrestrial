create function geometry_recv(internal) returns geometry
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

alter function geometry_recv(internal) owner to supabase_admin;

grant execute on function geometry_recv(internal) to postgres;

grant execute on function geometry_recv(internal) to anon;

grant execute on function geometry_recv(internal) to authenticated;

grant execute on function geometry_recv(internal) to service_role;

