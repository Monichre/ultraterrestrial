create function sparsevec_out(sparsevec) returns cstring
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

alter function sparsevec_out(sparsevec) owner to supabase_admin;

grant execute on function sparsevec_out(sparsevec) to postgres;

grant execute on function sparsevec_out(sparsevec) to anon;

grant execute on function sparsevec_out(sparsevec) to authenticated;

grant execute on function sparsevec_out(sparsevec) to service_role;

