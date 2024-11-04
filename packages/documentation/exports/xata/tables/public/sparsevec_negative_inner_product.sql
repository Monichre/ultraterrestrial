create function sparsevec_negative_inner_product(sparsevec, sparsevec) returns double precision
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

alter function sparsevec_negative_inner_product(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function sparsevec_negative_inner_product(sparsevec, sparsevec) to postgres;

grant execute on function sparsevec_negative_inner_product(sparsevec, sparsevec) to anon;

grant execute on function sparsevec_negative_inner_product(sparsevec, sparsevec) to authenticated;

grant execute on function sparsevec_negative_inner_product(sparsevec, sparsevec) to service_role;

