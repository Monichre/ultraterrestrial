create function subvector(vector, integer, integer) returns vector
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

alter function subvector(vector, integer, integer) owner to supabase_admin;

grant execute on function subvector(vector, integer, integer) to postgres;

grant execute on function subvector(vector, integer, integer) to anon;

grant execute on function subvector(vector, integer, integer) to authenticated;

grant execute on function subvector(vector, integer, integer) to service_role;

create function subvector(halfvec, integer, integer) returns halfvec
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

alter function subvector(halfvec, integer, integer) owner to supabase_admin;

grant execute on function subvector(halfvec, integer, integer) to postgres;

grant execute on function subvector(halfvec, integer, integer) to anon;

grant execute on function subvector(halfvec, integer, integer) to authenticated;

grant execute on function subvector(halfvec, integer, integer) to service_role;

