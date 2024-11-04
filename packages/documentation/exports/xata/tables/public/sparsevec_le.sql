create function sparsevec_le(sparsevec, sparsevec) returns boolean
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

alter function sparsevec_le(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function sparsevec_le(sparsevec, sparsevec) to postgres;

grant execute on function sparsevec_le(sparsevec, sparsevec) to anon;

grant execute on function sparsevec_le(sparsevec, sparsevec) to authenticated;

grant execute on function sparsevec_le(sparsevec, sparsevec) to service_role;

