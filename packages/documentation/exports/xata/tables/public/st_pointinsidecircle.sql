create function st_pointinsidecircle(geometry, double precision, double precision, double precision) returns boolean
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_pointinsidecircle(geometry, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_pointinsidecircle(geometry, double precision, double precision, double precision) to postgres;

grant execute on function st_pointinsidecircle(geometry, double precision, double precision, double precision) to anon;

grant execute on function st_pointinsidecircle(geometry, double precision, double precision, double precision) to authenticated;

grant execute on function st_pointinsidecircle(geometry, double precision, double precision, double precision) to service_role;

