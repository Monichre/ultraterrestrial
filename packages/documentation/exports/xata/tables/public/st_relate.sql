create function st_relate(geom1 geometry, geom2 geometry) returns text
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

alter function st_relate(geometry, geometry) owner to supabase_admin;

grant execute on function st_relate(geometry, geometry) to postgres;

grant execute on function st_relate(geometry, geometry) to anon;

grant execute on function st_relate(geometry, geometry) to authenticated;

grant execute on function st_relate(geometry, geometry) to service_role;

create function st_relate(geom1 geometry, geom2 geometry, integer) returns text
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

alter function st_relate(geometry, geometry, integer) owner to supabase_admin;

grant execute on function st_relate(geometry, geometry, integer) to postgres;

grant execute on function st_relate(geometry, geometry, integer) to anon;

grant execute on function st_relate(geometry, geometry, integer) to authenticated;

grant execute on function st_relate(geometry, geometry, integer) to service_role;

create function st_relate(geom1 geometry, geom2 geometry, text) returns boolean
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

alter function st_relate(geometry, geometry, text) owner to supabase_admin;

grant execute on function st_relate(geometry, geometry, text) to postgres;

grant execute on function st_relate(geometry, geometry, text) to anon;

grant execute on function st_relate(geometry, geometry, text) to authenticated;

grant execute on function st_relate(geometry, geometry, text) to service_role;

