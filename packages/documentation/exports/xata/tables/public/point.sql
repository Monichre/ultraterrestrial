create function point(geometry) returns point
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

alter function point(geometry) owner to supabase_admin;

grant execute on function point(geometry) to postgres;

grant execute on function point(geometry) to anon;

grant execute on function point(geometry) to authenticated;

grant execute on function point(geometry) to service_role;

