create function vector_le(vector, vector) returns boolean
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

alter function vector_le(vector, vector) owner to supabase_admin;

grant execute on function vector_le(vector, vector) to postgres;

grant execute on function vector_le(vector, vector) to anon;

grant execute on function vector_le(vector, vector) to authenticated;

grant execute on function vector_le(vector, vector) to service_role;

