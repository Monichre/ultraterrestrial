create function st_asgml(geom geometry, maxdecimaldigits integer default 15, options integer default 0) returns text
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_asgml(geometry, integer, integer) owner to supabase_admin;

grant execute on function st_asgml(geometry, integer, integer) to postgres;

grant execute on function st_asgml(geometry, integer, integer) to anon;

grant execute on function st_asgml(geometry, integer, integer) to authenticated;

grant execute on function st_asgml(geometry, integer, integer) to service_role;

create function st_asgml(version integer, geom geometry, maxdecimaldigits integer default 15, options integer default 0, nprefix text default NULL::text, id text default NULL::text) returns text
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_asgml(integer, geometry, integer, integer, text, text) owner to supabase_admin;

grant execute on function st_asgml(integer, geometry, integer, integer, text, text) to postgres;

grant execute on function st_asgml(integer, geometry, integer, integer, text, text) to anon;

grant execute on function st_asgml(integer, geometry, integer, integer, text, text) to authenticated;

grant execute on function st_asgml(integer, geometry, integer, integer, text, text) to service_role;

create function st_asgml(version integer, geog geography, maxdecimaldigits integer default 15, options integer default 0, nprefix text default 'gml'::text, id text default ''::text) returns text
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

alter function st_asgml(integer, geography, integer, integer, text, text) owner to supabase_admin;

grant execute on function st_asgml(integer, geography, integer, integer, text, text) to postgres;

grant execute on function st_asgml(integer, geography, integer, integer, text, text) to anon;

grant execute on function st_asgml(integer, geography, integer, integer, text, text) to authenticated;

grant execute on function st_asgml(integer, geography, integer, integer, text, text) to service_role;

create function st_asgml(geog geography, maxdecimaldigits integer default 15, options integer default 0, nprefix text default 'gml'::text, id text default ''::text) returns text
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

alter function st_asgml(geography, integer, integer, text, text) owner to supabase_admin;

grant execute on function st_asgml(geography, integer, integer, text, text) to postgres;

grant execute on function st_asgml(geography, integer, integer, text, text) to anon;

grant execute on function st_asgml(geography, integer, integer, text, text) to authenticated;

grant execute on function st_asgml(geography, integer, integer, text, text) to service_role;

create function st_asgml(text) returns text
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$ SELECT public._ST_AsGML(2,$1::public.geometry,15,0, NULL, NULL);  $$;

alter function st_asgml(text) owner to supabase_admin;

grant execute on function st_asgml(text) to postgres;

grant execute on function st_asgml(text) to anon;

grant execute on function st_asgml(text) to authenticated;

grant execute on function st_asgml(text) to service_role;

