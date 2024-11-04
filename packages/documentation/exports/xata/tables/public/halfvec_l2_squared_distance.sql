create function halfvec_l2_squared_distance(halfvec, halfvec) returns double precision
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

alter function halfvec_l2_squared_distance(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_l2_squared_distance(halfvec, halfvec) to postgres;

grant execute on function halfvec_l2_squared_distance(halfvec, halfvec) to anon;

grant execute on function halfvec_l2_squared_distance(halfvec, halfvec) to authenticated;

grant execute on function halfvec_l2_squared_distance(halfvec, halfvec) to service_role;

