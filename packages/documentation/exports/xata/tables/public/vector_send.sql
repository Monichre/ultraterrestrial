create function vector_send(vector) returns bytea
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

alter function vector_send(vector) owner to supabase_admin;

grant execute on function vector_send(vector) to postgres;

grant execute on function vector_send(vector) to anon;

grant execute on function vector_send(vector) to authenticated;

grant execute on function vector_send(vector) to service_role;

