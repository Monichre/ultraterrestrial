create function vector_mul(vector, vector) returns vector
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

alter function vector_mul(vector, vector) owner to supabase_admin;

grant execute on function vector_mul(vector, vector) to postgres;

grant execute on function vector_mul(vector, vector) to anon;

grant execute on function vector_mul(vector, vector) to authenticated;

grant execute on function vector_mul(vector, vector) to service_role;

