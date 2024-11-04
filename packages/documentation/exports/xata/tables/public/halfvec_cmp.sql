create function halfvec_cmp(halfvec, halfvec) returns integer
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

alter function halfvec_cmp(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_cmp(halfvec, halfvec) to postgres;

grant execute on function halfvec_cmp(halfvec, halfvec) to anon;

grant execute on function halfvec_cmp(halfvec, halfvec) to authenticated;

grant execute on function halfvec_cmp(halfvec, halfvec) to service_role;

