create function halfvec_accum(double precision[], halfvec) returns double precision[]
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

alter function halfvec_accum(double precision[], halfvec) owner to supabase_admin;

grant execute on function halfvec_accum(double precision[], halfvec) to postgres;

grant execute on function halfvec_accum(double precision[], halfvec) to anon;

grant execute on function halfvec_accum(double precision[], halfvec) to authenticated;

grant execute on function halfvec_accum(double precision[], halfvec) to service_role;

