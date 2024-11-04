create function vector_avg(double precision[]) returns vector
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

alter function vector_avg(double precision[]) owner to supabase_admin;

grant execute on function vector_avg(double precision[]) to postgres;

grant execute on function vector_avg(double precision[]) to anon;

grant execute on function vector_avg(double precision[]) to authenticated;

grant execute on function vector_avg(double precision[]) to service_role;

