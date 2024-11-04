create function st_linecrossingdirection(line1 geometry, line2 geometry) returns integer
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_linecrossingdirection(geometry, geometry) owner to supabase_admin;

grant execute on function st_linecrossingdirection(geometry, geometry) to postgres;

grant execute on function st_linecrossingdirection(geometry, geometry) to anon;

grant execute on function st_linecrossingdirection(geometry, geometry) to authenticated;

grant execute on function st_linecrossingdirection(geometry, geometry) to service_role;

