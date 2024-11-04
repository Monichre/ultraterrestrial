create function st_covers(geom1 geometry, geom2 geometry) returns boolean
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

alter function st_covers(geometry, geometry) owner to supabase_admin;

grant execute on function st_covers(geometry, geometry) to postgres;

grant execute on function st_covers(geometry, geometry) to anon;

grant execute on function st_covers(geometry, geometry) to authenticated;

grant execute on function st_covers(geometry, geometry) to service_role;

create function st_covers(geog1 geography, geog2 geography) returns boolean
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

alter function st_covers(geography, geography) owner to supabase_admin;

grant execute on function st_covers(geography, geography) to postgres;

grant execute on function st_covers(geography, geography) to anon;

grant execute on function st_covers(geography, geography) to authenticated;

grant execute on function st_covers(geography, geography) to service_role;

create function st_covers(text, text) returns boolean
    immutable
    parallel safe
    language sql
as
$$ SELECT public.ST_Covers($1::public.geometry, $2::public.geometry);  $$;

alter function st_covers(text, text) owner to supabase_admin;

grant execute on function st_covers(text, text) to postgres;

grant execute on function st_covers(text, text) to anon;

grant execute on function st_covers(text, text) to authenticated;

grant execute on function st_covers(text, text) to service_role;

