create function halfvec_add(halfvec, halfvec) returns halfvec
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

alter function halfvec_add(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_add(halfvec, halfvec) to postgres;

grant execute on function halfvec_add(halfvec, halfvec) to anon;

grant execute on function halfvec_add(halfvec, halfvec) to authenticated;

grant execute on function halfvec_add(halfvec, halfvec) to service_role;

