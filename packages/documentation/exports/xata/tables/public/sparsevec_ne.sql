create function sparsevec_ne(sparsevec, sparsevec) returns boolean
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

alter function sparsevec_ne(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function sparsevec_ne(sparsevec, sparsevec) to postgres;

grant execute on function sparsevec_ne(sparsevec, sparsevec) to anon;

grant execute on function sparsevec_ne(sparsevec, sparsevec) to authenticated;

grant execute on function sparsevec_ne(sparsevec, sparsevec) to service_role;

