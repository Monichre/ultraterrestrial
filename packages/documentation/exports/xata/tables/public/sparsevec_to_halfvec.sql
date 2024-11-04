create function sparsevec_to_halfvec(sparsevec, integer, boolean) returns halfvec
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

alter function sparsevec_to_halfvec(sparsevec, integer, boolean) owner to supabase_admin;

grant execute on function sparsevec_to_halfvec(sparsevec, integer, boolean) to postgres;

grant execute on function sparsevec_to_halfvec(sparsevec, integer, boolean) to anon;

grant execute on function sparsevec_to_halfvec(sparsevec, integer, boolean) to authenticated;

grant execute on function sparsevec_to_halfvec(sparsevec, integer, boolean) to service_role;

