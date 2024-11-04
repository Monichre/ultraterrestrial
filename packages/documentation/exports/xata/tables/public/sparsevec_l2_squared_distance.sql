create function sparsevec_l2_squared_distance(sparsevec, sparsevec) returns double precision
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

alter function sparsevec_l2_squared_distance(sparsevec, sparsevec) owner to supabase_admin;

grant execute on function sparsevec_l2_squared_distance(sparsevec, sparsevec) to postgres;

grant execute on function sparsevec_l2_squared_distance(sparsevec, sparsevec) to anon;

grant execute on function sparsevec_l2_squared_distance(sparsevec, sparsevec) to authenticated;

grant execute on function sparsevec_l2_squared_distance(sparsevec, sparsevec) to service_role;

