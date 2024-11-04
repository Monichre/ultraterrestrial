create function equals(geom1 geometry, geom2 geometry) returns boolean
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function equals(geometry, geometry) owner to supabase_admin;

grant execute on function equals(geometry, geometry) to postgres;

grant execute on function equals(geometry, geometry) to anon;

grant execute on function equals(geometry, geometry) to authenticated;

grant execute on function equals(geometry, geometry) to service_role;

