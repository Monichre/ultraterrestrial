create function st_area2d(geometry) returns double precision
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_area2d(geometry) owner to supabase_admin;

grant execute on function st_area2d(geometry) to postgres;

grant execute on function st_area2d(geometry) to anon;

grant execute on function st_area2d(geometry) to authenticated;

grant execute on function st_area2d(geometry) to service_role;

