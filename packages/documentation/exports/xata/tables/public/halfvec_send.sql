create function halfvec_send(halfvec) returns bytea
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

alter function halfvec_send(halfvec) owner to supabase_admin;

grant execute on function halfvec_send(halfvec) to postgres;

grant execute on function halfvec_send(halfvec) to anon;

grant execute on function halfvec_send(halfvec) to authenticated;

grant execute on function halfvec_send(halfvec) to service_role;

