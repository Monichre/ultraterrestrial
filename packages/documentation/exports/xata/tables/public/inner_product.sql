create function inner_product(vector, vector) returns double precision
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

alter function inner_product(vector, vector) owner to supabase_admin;

grant execute on function inner_product(vector, vector) to postgres;

grant execute on function inner_product(vector, vector) to anon;

grant execute on function inner_product(vector, vector) to authenticated;

grant execute on function inner_product(vector, vector) to service_role;

create function inner_product(halfvec, halfvec) returns double precision
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

alter function inner_product(halfvec, halfvec) owner to supabase_admin;

grant execute on function inner_product(halfvec, halfvec) to postgres;

grant execute on function inner_product(halfvec, halfvec) to anon;

grant execute on function inner_product(halfvec, halfvec) to authenticated;

grant execute on function inner_product(halfvec, halfvec) to service_role;

create function inner_product(sparsevec, sparsevec) returns double precision
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

alter function inner_product(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function inner_product(sparsevec, sparsevec) to postgres;

grant execute on function inner_product(sparsevec, sparsevec) to anon;

grant execute on function inner_product(sparsevec, sparsevec) to authenticated;

grant execute on function inner_product(sparsevec, sparsevec) to service_role;

