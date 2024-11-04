create function st_setsrid(geom geometry, srid integer) returns geometry
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

comment on function st_setsrid(geometry, integer) is 'args: geom, srid - Set the SRID on a geometry.';

alter function st_setsrid(geometry, integer) owner to supabase_admin;

grant execute on function st_setsrid(geometry, integer) to postgres;

grant execute on function st_setsrid(geometry, integer) to anon;

grant execute on function st_setsrid(geometry, integer) to authenticated;

grant execute on function st_setsrid(geometry, integer) to service_role;

create function st_setsrid(geog geography, srid integer) returns geography
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

alter function st_setsrid(geography, integer) owner to supabase_admin;

grant execute on function st_setsrid(geography, integer) to postgres;

grant execute on function st_setsrid(geography, integer) to anon;

grant execute on function st_setsrid(geography, integer) to authenticated;

grant execute on function st_setsrid(geography, integer) to service_role;

