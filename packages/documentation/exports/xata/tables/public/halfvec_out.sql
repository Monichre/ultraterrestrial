create function halfvec_out(halfvec) returns cstring
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

alter function halfvec_out(halfvec) owner to supabase_admin;

grant execute on function halfvec_out(halfvec) to postgres;

grant execute on function halfvec_out(halfvec) to anon;

grant execute on function halfvec_out(halfvec) to authenticated;

grant execute on function halfvec_out(halfvec) to service_role;

