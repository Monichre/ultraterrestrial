create function sparsevec_ge(sparsevec, sparsevec) returns boolean
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

alter function sparsevec_ge(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function sparsevec_ge(sparsevec, sparsevec) to postgres;

grant execute on function sparsevec_ge(sparsevec, sparsevec) to anon;

grant execute on function sparsevec_ge(sparsevec, sparsevec) to authenticated;

grant execute on function sparsevec_ge(sparsevec, sparsevec) to service_role;

