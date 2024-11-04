create function l1_distance(vector, vector) returns double precision
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

alter function l1_distance(vector, vector) owner to supabase_admin;

grant execute on function l1_distance(vector, vector) to postgres;

grant execute on function l1_distance(vector, vector) to anon;

grant execute on function l1_distance(vector, vector) to authenticated;

grant execute on function l1_distance(vector, vector) to service_role;

create function l1_distance(halfvec, halfvec) returns double precision
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

alter function l1_distance(halfvec, halfvec) owner to supabase_admin;

grant execute on function l1_distance(halfvec, halfvec) to postgres;

grant execute on function l1_distance(halfvec, halfvec) to anon;

grant execute on function l1_distance(halfvec, halfvec) to authenticated;

grant execute on function l1_distance(halfvec, halfvec) to service_role;

create function l1_distance(sparsevec, sparsevec) returns double precision
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

alter function l1_distance(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function l1_distance(sparsevec, sparsevec) to postgres;

grant execute on function l1_distance(sparsevec, sparsevec) to anon;

grant execute on function l1_distance(sparsevec, sparsevec) to authenticated;

grant execute on function l1_distance(sparsevec, sparsevec) to service_role;

