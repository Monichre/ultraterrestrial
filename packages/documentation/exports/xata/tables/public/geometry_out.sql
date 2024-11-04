create function geometry_out(geometry) returns cstring
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

alter function geometry_out(geometry) owner to supabase_admin;

grant execute on function geometry_out(geometry) to postgres;

grant execute on function geometry_out(geometry) to anon;

grant execute on function geometry_out(geometry) to authenticated;

grant execute on function geometry_out(geometry) to service_role;

