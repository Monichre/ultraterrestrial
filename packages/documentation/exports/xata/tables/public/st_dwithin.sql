create function st_dwithin(geom1 geometry, geom2 geometry, double precision) returns boolean
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

alter function st_dwithin(geometry, geometry, double precision) owner to supabase_admin;

grant execute on function st_dwithin(geometry, geometry, double precision) to postgres;

grant execute on function st_dwithin(geometry, geometry, double precision) to anon;

grant execute on function st_dwithin(geometry, geometry, double precision) to authenticated;

grant execute on function st_dwithin(geometry, geometry, double precision) to service_role;

create function st_dwithin(geog1 geography, geog2 geography, tolerance double precision, use_spheroid boolean default true) returns boolean
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

alter function st_dwithin(geography, geography, double precision, boolean) owner to supabase_admin;

grant execute on function st_dwithin(geography, geography, double precision, boolean) to postgres;

grant execute on function st_dwithin(geography, geography, double precision, boolean) to anon;

grant execute on function st_dwithin(geography, geography, double precision, boolean) to authenticated;

grant execute on function st_dwithin(geography, geography, double precision, boolean) to service_role;

create function st_dwithin(text, text, double precision) returns boolean
    immutable
    parallel safe
    language sql
as
$$ SELECT public.ST_DWithin($1::public.geometry, $2::public.geometry, $3);  $$;

alter function st_dwithin(text, text, double precision) owner to supabase_admin;

grant execute on function st_dwithin(text, text, double precision) to postgres;

grant execute on function st_dwithin(text, text, double precision) to anon;

grant execute on function st_dwithin(text, text, double precision) to authenticated;

grant execute on function st_dwithin(text, text, double precision) to service_role;

