create function halfvec_gt(halfvec, halfvec) returns boolean
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

alter function halfvec_gt(halfvec, halfvec) owner to supabase_admin;

grant execute on function halfvec_gt(halfvec, halfvec) to postgres;

grant execute on function halfvec_gt(halfvec, halfvec) to anon;

grant execute on function halfvec_gt(halfvec, halfvec) to authenticated;

grant execute on function halfvec_gt(halfvec, halfvec) to service_role;

