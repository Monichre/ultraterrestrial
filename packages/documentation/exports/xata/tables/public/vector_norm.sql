create function vector_norm(vector) returns double precision
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

alter function vector_norm(vector) owner to supabase_admin;

grant execute on function vector_norm(vector) to postgres;

grant execute on function vector_norm(vector) to anon;

grant execute on function vector_norm(vector) to authenticated;

grant execute on function vector_norm(vector) to service_role;

