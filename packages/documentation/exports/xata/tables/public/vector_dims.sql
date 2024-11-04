create function vector_dims(vector) returns integer
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

alter function vector_dims(vector) owner to supabase_admin;

grant execute on function vector_dims(vector) to postgres;

grant execute on function vector_dims(vector) to anon;

grant execute on function vector_dims(vector) to authenticated;

grant execute on function vector_dims(vector) to service_role;

create function vector_dims(halfvec) returns integer
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

alter function vector_dims(halfvec) owner to supabase_admin;

grant execute on function vector_dims(halfvec) to postgres;

grant execute on function vector_dims(halfvec) to anon;

grant execute on function vector_dims(halfvec) to authenticated;

grant execute on function vector_dims(halfvec) to service_role;

