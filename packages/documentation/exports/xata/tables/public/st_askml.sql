create function st_askml(geom geometry, maxdecimaldigits integer default 15, nprefix text default ''::text) returns text
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

alter function st_askml(geometry, integer, text) owner to supabase_admin;

grant execute on function st_askml(geometry, integer, text) to postgres;

grant execute on function st_askml(geometry, integer, text) to anon;

grant execute on function st_askml(geometry, integer, text) to authenticated;

grant execute on function st_askml(geometry, integer, text) to service_role;

create function st_askml(geog geography, maxdecimaldigits integer default 15, nprefix text default ''::text) returns text
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

alter function st_askml(geography, integer, text) owner to supabase_admin;

grant execute on function st_askml(geography, integer, text) to postgres;

grant execute on function st_askml(geography, integer, text) to anon;

grant execute on function st_askml(geography, integer, text) to authenticated;

grant execute on function st_askml(geography, integer, text) to service_role;

create function st_askml(text) returns text
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$ SELECT public.ST_AsKML($1::public.geometry, 15);  $$;

alter function st_askml(text) owner to supabase_admin;

grant execute on function st_askml(text) to postgres;

grant execute on function st_askml(text) to anon;

grant execute on function st_askml(text) to authenticated;

grant execute on function st_askml(text) to service_role;

