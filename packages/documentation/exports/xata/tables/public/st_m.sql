create function st_m(geometry) returns double precision
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

comment on function st_m(geometry) is 'args: a_point - Returns the M coordinate of a Point.';

alter function st_m(geometry) owner to supabase_admin;

grant execute on function st_m(geometry) to postgres;

grant execute on function st_m(geometry) to anon;

grant execute on function st_m(geometry) to authenticated;

grant execute on function st_m(geometry) to service_role;

