create function vector_negative_inner_product(vector, vector) returns double precision
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

alter function vector_negative_inner_product(vector, vector) owner to supabase_admin;

grant execute on function vector_negative_inner_product(vector, vector) to postgres;

grant execute on function vector_negative_inner_product(vector, vector) to anon;

grant execute on function vector_negative_inner_product(vector, vector) to authenticated;

grant execute on function vector_negative_inner_product(vector, vector) to service_role;

