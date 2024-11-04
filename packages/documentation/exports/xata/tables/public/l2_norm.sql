create function l2_norm(halfvec) returns double precision
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

alter function l2_norm(halfvec) owner to supabase_admin;

grant execute on function l2_norm(halfvec) to postgres;

grant execute on function l2_norm(halfvec) to anon;

grant execute on function l2_norm(halfvec) to authenticated;

grant execute on function l2_norm(halfvec) to service_role;

create function l2_norm(sparsevec) returns double precision
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

alter function l2_norm(sparsevec) owner to supabase_admin;

grant execute on function l2_norm(sparsevec) to postgres;

grant execute on function l2_norm(sparsevec) to anon;

grant execute on function l2_norm(sparsevec) to authenticated;

grant execute on function l2_norm(sparsevec) to service_role;

