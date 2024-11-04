create function l2_normalize(vector) returns vector
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

alter function l2_normalize(vector) owner to supabase_admin;

grant execute on function l2_normalize(vector) to postgres;

grant execute on function l2_normalize(vector) to anon;

grant execute on function l2_normalize(vector) to authenticated;

grant execute on function l2_normalize(vector) to service_role;

create function l2_normalize(halfvec) returns halfvec
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

alter function l2_normalize(halfvec) owner to supabase_admin;

grant execute on function l2_normalize(halfvec) to postgres;

grant execute on function l2_normalize(halfvec) to anon;

grant execute on function l2_normalize(halfvec) to authenticated;

grant execute on function l2_normalize(halfvec) to service_role;

create function l2_normalize(sparsevec) returns sparsevec
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

alter function l2_normalize(sparsevec) owner to supabase_admin;

grant execute on function l2_normalize(sparsevec) to postgres;

grant execute on function l2_normalize(sparsevec) to anon;

grant execute on function l2_normalize(sparsevec) to authenticated;

grant execute on function l2_normalize(sparsevec) to service_role;

