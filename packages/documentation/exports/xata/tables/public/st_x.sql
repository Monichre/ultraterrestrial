create function st_x(geometry) returns double precision
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

comment on function st_x(geometry) is 'args: a_point - Returns the X coordinate of a Point.';

alter function st_x(geometry) owner to supabase_admin;

grant execute on function st_x(geometry) to postgres;

grant execute on function st_x(geometry) to anon;

grant execute on function st_x(geometry) to authenticated;

grant execute on function st_x(geometry) to service_role;

