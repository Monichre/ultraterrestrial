create function st_intersects(geom1 geometry, geom2 geometry) returns boolean
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

alter function st_intersects(geometry, geometry) owner to supabase_admin;

grant execute on function st_intersects(geometry, geometry) to postgres;

grant execute on function st_intersects(geometry, geometry) to anon;

grant execute on function st_intersects(geometry, geometry) to authenticated;

grant execute on function st_intersects(geometry, geometry) to service_role;

create function st_intersects(geog1 geography, geog2 geography) returns boolean
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

alter function st_intersects(geography, geography) owner to supabase_admin;

grant execute on function st_intersects(geography, geography) to postgres;

grant execute on function st_intersects(geography, geography) to anon;

grant execute on function st_intersects(geography, geography) to authenticated;

grant execute on function st_intersects(geography, geography) to service_role;

create function st_intersects(text, text) returns boolean
    immutable
    parallel safe
    language sql
as
$$ SELECT public.ST_Intersects($1::public.geometry, $2::public.geometry);  $$;

alter function st_intersects(text, text) owner to supabase_admin;

grant execute on function st_intersects(text, text) to postgres;

grant execute on function st_intersects(text, text) to anon;

grant execute on function st_intersects(text, text) to authenticated;

grant execute on function st_intersects(text, text) to service_role;

