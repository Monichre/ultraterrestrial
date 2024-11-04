create function vector_out(vector) returns cstring
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

alter function vector_out(vector) owner to supabase_admin;

grant execute on function vector_out(vector) to postgres;

grant execute on function vector_out(vector) to anon;

grant execute on function vector_out(vector) to authenticated;

grant execute on function vector_out(vector) to service_role;

