create function halfvec_lt(halfvec, halfvec) returns boolean
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

alter function halfvec_lt(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_lt(halfvec, halfvec) to postgres;

grant execute on function halfvec_lt(halfvec, halfvec) to anon;

grant execute on function halfvec_lt(halfvec, halfvec) to authenticated;

grant execute on function halfvec_lt(halfvec, halfvec) to service_role;

