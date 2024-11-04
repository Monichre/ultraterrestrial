create function st_geometryn(geometry, integer) returns geometry
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

comment on function st_geometryn(geometry, integer) is 'args: geomA, n - Return an element of a geometry collection.';

alter function st_geometryn(geometry, integer) owner to supabase_admin;

grant execute on function st_geometryn(geometry, integer) to postgres;

grant execute on function st_geometryn(geometry, integer) to anon;

grant execute on function st_geometryn(geometry, integer) to authenticated;

grant execute on function st_geometryn(geometry, integer) to service_role;

