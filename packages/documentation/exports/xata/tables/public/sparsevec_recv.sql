create function sparsevec_recv(internal, oid, integer) returns sparsevec
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

alter function sparsevec_recv(internal, oid, integer) owner to supabase_admin;

grant execute on function sparsevec_recv(internal, oid, integer) to postgres;

grant execute on function sparsevec_recv(internal, oid, integer) to anon;

grant execute on function sparsevec_recv(internal, oid, integer) to authenticated;

grant execute on function sparsevec_recv(internal, oid, integer) to service_role;

