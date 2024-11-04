create function polygon(geometry) returns polygon
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

alter function polygon(geometry) owner to supabase_admin;

grant execute on function polygon(geometry) to postgres;

grant execute on function polygon(geometry) to anon;

grant execute on function polygon(geometry) to authenticated;

grant execute on function polygon(geometry) to service_role;

