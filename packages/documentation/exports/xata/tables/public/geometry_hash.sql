create function geometry_hash(geometry) returns integer
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

alter function geometry_hash(geometry) owner to supabase_admin;

grant execute on function geometry_hash(geometry) to postgres;

grant execute on function geometry_hash(geometry) to anon;

grant execute on function geometry_hash(geometry) to authenticated;

grant execute on function geometry_hash(geometry) to service_role;

