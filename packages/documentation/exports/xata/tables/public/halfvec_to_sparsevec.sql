create function halfvec_to_sparsevec(halfvec, integer, boolean) returns sparsevec
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

alter function halfvec_to_sparsevec(halfvec, integer, boolean) owner to supabase_admin;

grant execute on function halfvec_to_sparsevec(halfvec, integer, boolean) to postgres;

grant execute on function halfvec_to_sparsevec(halfvec, integer, boolean) to anon;

grant execute on function halfvec_to_sparsevec(halfvec, integer, boolean) to authenticated;

grant execute on function halfvec_to_sparsevec(halfvec, integer, boolean) to service_role;

