create function halfvec_negative_inner_product(halfvec, halfvec) returns double precision
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

alter function halfvec_negative_inner_product(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_negative_inner_product(halfvec, halfvec) to postgres;

grant execute on function halfvec_negative_inner_product(halfvec, halfvec) to anon;

grant execute on function halfvec_negative_inner_product(halfvec, halfvec) to authenticated;

grant execute on function halfvec_negative_inner_product(halfvec, halfvec) to service_role;

