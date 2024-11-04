create function st_distance(geom1 geometry, geom2 geometry) returns double precision
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

comment on function st_distance(geometry, geometry) is 'args: g1, g2 - Returns the distance between two geometry or geography values.';

alter function st_distance(geometry, geometry) owner to supabase_admin;

grant execute on function st_distance(geometry, geometry) to postgres;

grant execute on function st_distance(geometry, geometry) to anon;

grant execute on function st_distance(geometry, geometry) to authenticated;

grant execute on function st_distance(geometry, geometry) to service_role;

create function st_distance(geog1 geography, geog2 geography, use_spheroid boolean default true) returns double precision
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

comment on function st_distance(geography, geography, boolean) is 'args: geog1, geog2, use_spheroid=true - Returns the distance between two geometry or geography values.';

alter function st_distance(geography, geography, boolean) owner to supabase_admin;

grant execute on function st_distance(geography, geography, boolean) to postgres;

grant execute on function st_distance(geography, geography, boolean) to anon;

grant execute on function st_distance(geography, geography, boolean) to authenticated;

grant execute on function st_distance(geography, geography, boolean) to service_role;

create function st_distance(text, text) returns double precision
    immutable
    strict
    parallel safe
    language sql
as
$$ SELECT public.ST_Distance($1::public.geometry, $2::public.geometry);  $$;

alter function st_distance(text, text) owner to supabase_admin;

grant execute on function st_distance(text, text) to postgres;

grant execute on function st_distance(text, text) to anon;

grant execute on function st_distance(text, text) to authenticated;

grant execute on function st_distance(text, text) to service_role;

