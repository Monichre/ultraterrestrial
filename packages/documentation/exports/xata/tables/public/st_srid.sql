create function st_srid(geom geometry) returns integer
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

comment on function st_srid(geometry) is 'args: g1 - Returns the spatial reference identifier for a geometry.';

alter function st_srid(geometry) owner to supabase_admin;

grant execute on function st_srid(geometry) to postgres;

grant execute on function st_srid(geometry) to anon;

grant execute on function st_srid(geometry) to authenticated;

grant execute on function st_srid(geometry) to service_role;

create function st_srid(geog geography) returns integer
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

alter function st_srid(geography) owner to supabase_admin;

grant execute on function st_srid(geography) to postgres;

grant execute on function st_srid(geography) to anon;

grant execute on function st_srid(geography) to authenticated;

grant execute on function st_srid(geography) to service_role;

