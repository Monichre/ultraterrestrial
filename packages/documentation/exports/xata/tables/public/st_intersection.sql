create function st_intersection(geom1 geometry, geom2 geometry, gridsize double precision default '-1'::integer) returns geometry
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

comment on function st_intersection(geometry, geometry, double precision) is 'args: geomA, geomB, gridSize = -1 - Computes a geometry representing the shared portion of geometries A and B.';

alter function st_intersection(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_intersection(geometry, geometry, double precision) to postgres;

grant execute on function st_intersection(geometry, geometry, double precision) to anon;

grant execute on function st_intersection(geometry, geometry, double precision) to authenticated;

grant execute on function st_intersection(geometry, geometry, double precision) to service_role;

create function st_intersection(geography, geography) returns geography
    immutable
    strict
    parallel safe
    language sql
as
$$SELECT public.geography(public.ST_Transform(public.ST_Intersection(public.ST_Transform(public.geometry($1), public._ST_BestSRID($1, $2)), public.ST_Transform(public.geometry($2), public._ST_BestSRID($1, $2))), 4326))$$;

comment on function st_intersection(geography, geography) is 'args: geogA, geogB - Computes a geometry representing the shared portion of geometries A and B.';

alter function st_intersection(geography, geography) owner to supabase_admin;

grant execute on function st_intersection(geography, geography) to postgres;

grant execute on function st_intersection(geography, geography) to anon;

grant execute on function st_intersection(geography, geography) to authenticated;

grant execute on function st_intersection(geography, geography) to service_role;

create function st_intersection(text, text) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$ SELECT public.ST_Intersection($1::public.geometry, $2::public.geometry);  $$;

alter function st_intersection(text, text) owner to supabase_admin;

grant execute on function st_intersection(text, text) to postgres;

grant execute on function st_intersection(text, text) to anon;

grant execute on function st_intersection(text, text) to authenticated;

grant execute on function st_intersection(text, text) to service_role;

