create function st_y(geometry) returns double precision
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

comment on function st_y(geometry) is 'args: a_point - Returns the Y coordinate of a Point.';

alter function st_y(geometry) owner to supabase_admin;

grant execute on function st_y(geometry) to postgres;

grant execute on function st_y(geometry) to anon;

grant execute on function st_y(geometry) to authenticated;

grant execute on function st_y(geometry) to service_role;

