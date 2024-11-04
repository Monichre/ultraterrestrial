create function vector_ge(vector, vector) returns boolean
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

alter function vector_ge(vector, vector) owner to supabase_admin;

grant execute on function vector_ge(vector, vector) to postgres;

grant execute on function vector_ge(vector, vector) to anon;

grant execute on function vector_ge(vector, vector) to authenticated;

grant execute on function vector_ge(vector, vector) to service_role;

