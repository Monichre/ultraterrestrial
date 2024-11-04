create function halfvec_concat(halfvec, halfvec) returns halfvec
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

alter function halfvec_concat(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_concat(halfvec, halfvec) to postgres;

grant execute on function halfvec_concat(halfvec, halfvec) to anon;

grant execute on function halfvec_concat(halfvec, halfvec) to authenticated;

grant execute on function halfvec_concat(halfvec, halfvec) to service_role;

