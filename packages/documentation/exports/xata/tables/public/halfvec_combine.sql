create function halfvec_combine(double precision[], double precision[]) returns double precision[]
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

alter function halfvec_combine(double precision[], double precision[]) owner to supabase_admin;

grant execute on function halfvec_combine(double precision[], double precision[]) to postgres;

grant execute on function halfvec_combine(double precision[], double precision[]) to anon;

grant execute on function halfvec_combine(double precision[], double precision[]) to authenticated;

grant execute on function halfvec_combine(double precision[], double precision[]) to service_role;

