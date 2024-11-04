create function sparsevec_cmp(sparsevec, sparsevec) returns integer
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

alter function sparsevec_cmp(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function sparsevec_cmp(sparsevec, sparsevec) to postgres;

grant execute on function sparsevec_cmp(sparsevec, sparsevec) to anon;

grant execute on function sparsevec_cmp(sparsevec, sparsevec) to authenticated;

grant execute on function sparsevec_cmp(sparsevec, sparsevec) to service_role;

