create function vector_cmp(vector, vector) returns integer
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

alter function vector_cmp(vector, vector) owner to supabase_admin;

grant execute on function vector_cmp(vector, vector) to postgres;

grant execute on function vector_cmp(vector, vector) to anon;

grant execute on function vector_cmp(vector, vector) to authenticated;

grant execute on function vector_cmp(vector, vector) to service_role;

