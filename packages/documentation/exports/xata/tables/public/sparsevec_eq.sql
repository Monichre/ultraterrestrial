create function sparsevec_eq(sparsevec, sparsevec) returns boolean
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

alter function sparsevec_eq(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function sparsevec_eq(sparsevec, sparsevec) to postgres;

grant execute on function sparsevec_eq(sparsevec, sparsevec) to anon;

grant execute on function sparsevec_eq(sparsevec, sparsevec) to authenticated;

grant execute on function sparsevec_eq(sparsevec, sparsevec) to service_role;

