create function st_3ddwithin(geom1 geometry, geom2 geometry, double precision) returns boolean
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

alter function st_3ddwithin(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_3ddwithin(geometry, geometry, double precision) to postgres;

grant execute on function st_3ddwithin(geometry, geometry, double precision) to anon;

grant execute on function st_3ddwithin(geometry, geometry, double precision) to authenticated;

grant execute on function st_3ddwithin(geometry, geometry, double precision) to service_role;
