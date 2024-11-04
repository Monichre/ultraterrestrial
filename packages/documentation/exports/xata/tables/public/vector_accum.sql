create function vector_accum(double precision[], vector) returns double precision[]
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

alter function vector_accum(double precision[], vector) owner to supabase_admin;

grant execute on function vector_accum(double precision[], vector) to postgres;

grant execute on function vector_accum(double precision[], vector) to anon;

grant execute on function vector_accum(double precision[], vector) to authenticated;

grant execute on function vector_accum(double precision[], vector) to service_role;

