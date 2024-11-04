create function halfvec_avg(double precision[]) returns halfvec
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

alter function halfvec_avg(double precision[]) owner to supabase_admin;

grant execute on function halfvec_avg(double precision[]) to postgres;

grant execute on function halfvec_avg(double precision[]) to anon;

grant execute on function halfvec_avg(double precision[]) to authenticated;

grant execute on function halfvec_avg(double precision[]) to service_role;

