create function st_coveredby(geom1 geometry, geom2 geometry) returns boolean
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

alter function st_coveredby(geometry, geometry) owner to supabase_admin;

grant execute on function st_coveredby(geometry, geometry) to postgres;

grant execute on function st_coveredby(geometry, geometry) to anon;

grant execute on function st_coveredby(geometry, geometry) to authenticated;

grant execute on function st_coveredby(geometry, geometry) to service_role;

create function st_coveredby(geog1 geography, geog2 geography) returns boolean
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

alter function st_coveredby(geography, geography) owner to supabase_admin;

grant execute on function st_coveredby(geography, geography) to postgres;

grant execute on function st_coveredby(geography, geography) to anon;

grant execute on function st_coveredby(geography, geography) to authenticated;

grant execute on function st_coveredby(geography, geography) to service_role;

create function st_coveredby(text, text) returns boolean
    immutable
    parallel safe
    language sql
as
$$ SELECT public.ST_CoveredBy($1::public.geometry, $2::public.geometry);  $$;

alter function st_coveredby(text, text) owner to supabase_admin;

grant execute on function st_coveredby(text, text) to postgres;

grant execute on function st_coveredby(text, text) to anon;

grant execute on function st_coveredby(text, text) to authenticated;

grant execute on function st_coveredby(text, text) to service_role;

