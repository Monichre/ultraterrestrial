create function sparsevec_send(sparsevec) returns bytea
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

alter function sparsevec_send(sparsevec) owner to supabase_admin;

grant execute on function sparsevec_send(sparsevec) to postgres;

grant execute on function sparsevec_send(sparsevec) to anon;

grant execute on function sparsevec_send(sparsevec) to authenticated;

grant execute on function sparsevec_send(sparsevec) to service_role;

