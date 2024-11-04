create function st_z(geometry) returns double precision
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

comment on function st_z(geometry) is 'args: a_point - Returns the Z coordinate of a Point.';

alter function st_z(geometry) owner to supabase_admin;

grant execute on function st_z(geometry) to postgres;

grant execute on function st_z(geometry) to anon;

grant execute on function st_z(geometry) to authenticated;

grant execute on function st_z(geometry) to service_role;

