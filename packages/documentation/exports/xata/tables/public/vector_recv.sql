create function vector_recv(internal, oid, integer) returns vector
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

alter function vector_recv(internal, oid, integer) owner to supabase_admin;

grant execute on function vector_recv(internal, oid, integer) to postgres;

grant execute on function vector_recv(internal, oid, integer) to anon;

grant execute on function vector_recv(internal, oid, integer) to authenticated;

grant execute on function vector_recv(internal, oid, integer) to service_role;

