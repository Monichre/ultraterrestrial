create function st_assvg(geom geometry, rel integer default 0, maxdecimaldigits integer default 15) returns text
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_assvg(geometry, integer, integer) owner to supabase_admin;

grant execute on function st_assvg(geometry, integer, integer) to postgres;

grant execute on function st_assvg(geometry, integer, integer) to anon;

grant execute on function st_assvg(geometry, integer, integer) to authenticated;

grant execute on function st_assvg(geometry, integer, integer) to service_role;

create function st_assvg(geog geography, rel integer default 0, maxdecimaldigits integer default 15) returns text
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_assvg(geography, integer, integer) owner to supabase_admin;

grant execute on function st_assvg(geography, integer, integer) to postgres;

grant execute on function st_assvg(geography, integer, integer) to anon;

grant execute on function st_assvg(geography, integer, integer) to authenticated;

grant execute on function st_assvg(geography, integer, integer) to service_role;

create function st_assvg(text) returns text
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$ SELECT public.ST_AsSVG($1::public.geometry,0,15);  $$;

alter function st_assvg(text) owner to supabase_admin;

grant execute on function st_assvg(text) to postgres;

grant execute on function st_assvg(text) to anon;

grant execute on function st_assvg(text) to authenticated;

grant execute on function st_assvg(text) to service_role;

