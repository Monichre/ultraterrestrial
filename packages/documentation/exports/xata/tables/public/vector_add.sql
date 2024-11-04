create function vector_add(vector, vector) returns vector
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

alter function vector_add(vector, vector) owner to supabase_admin;

grant execute on function vector_add(vector, vector) to postgres;

grant execute on function vector_add(vector, vector) to anon;

grant execute on function vector_add(vector, vector) to authenticated;

grant execute on function vector_add(vector, vector) to service_role;

