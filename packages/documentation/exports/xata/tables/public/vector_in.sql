create function vector_in(cstring, oid, integer) returns vector
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

alter function vector_in(cstring, oid, integer) owner to supabase_admin;

grant execute on function vector_in(cstring, oid, integer) to postgres;

grant execute on function vector_in(cstring, oid, integer) to anon;

grant execute on function vector_in(cstring, oid, integer) to authenticated;

grant execute on function vector_in(cstring, oid, integer) to service_role;

