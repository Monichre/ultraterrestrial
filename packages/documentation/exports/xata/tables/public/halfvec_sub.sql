create function halfvec_sub(halfvec, halfvec) returns halfvec
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

alter function halfvec_sub(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_sub(halfvec, halfvec) to postgres;

grant execute on function halfvec_sub(halfvec, halfvec) to anon;

grant execute on function halfvec_sub(halfvec, halfvec) to authenticated;

grant execute on function halfvec_sub(halfvec, halfvec) to service_role;

