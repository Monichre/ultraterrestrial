create function vector_to_halfvec(vector, integer, boolean) returns halfvec
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

alter function vector_to_halfvec(vector, integer, boolean) owner to supabase_admin;

grant execute on function vector_to_halfvec(vector, integer, boolean) to postgres;

grant execute on function vector_to_halfvec(vector, integer, boolean) to anon;

grant execute on function vector_to_halfvec(vector, integer, boolean) to authenticated;

grant execute on function vector_to_halfvec(vector, integer, boolean) to service_role;
