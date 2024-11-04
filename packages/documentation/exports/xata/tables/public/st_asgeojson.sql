create function st_asgeojson(geom geometry, maxdecimaldigits integer default 9, options integer default 8) returns text
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

alter function st_asgeojson(geometry, integer, integer) owner to supabase_admin;

grant execute on function st_asgeojson(geometry, integer, integer) to postgres;

grant execute on function st_asgeojson(geometry, integer, integer) to anon;

grant execute on function st_asgeojson(geometry, integer, integer) to authenticated;

grant execute on function st_asgeojson(geometry, integer, integer) to service_role;

create function st_asgeojson(r record, geom_column text default ''::text, maxdecimaldigits integer default 9, pretty_bool boolean default false) returns text
    stable
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

alter function st_asgeojson(record, text, integer, boolean) owner to supabase_admin;

grant execute on function st_asgeojson(record, text, integer, boolean) to postgres;

grant execute on function st_asgeojson(record, text, integer, boolean) to anon;

grant execute on function st_asgeojson(record, text, integer, boolean) to authenticated;

grant execute on function st_asgeojson(record, text, integer, boolean) to service_role;

create function st_asgeojson(geog geography, maxdecimaldigits integer default 9, options integer default 0) returns text
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

alter function st_asgeojson(geography, integer, integer) owner to supabase_admin;

grant execute on function st_asgeojson(geography, integer, integer) to postgres;

grant execute on function st_asgeojson(geography, integer, integer) to anon;

grant execute on function st_asgeojson(geography, integer, integer) to authenticated;

grant execute on function st_asgeojson(geography, integer, integer) to service_role;

create function st_asgeojson(text) returns text
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$ SELECT public.ST_AsGeoJson($1::public.geometry, 9, 0);  $$;

alter function st_asgeojson(text) owner to supabase_admin;

grant execute on function st_asgeojson(text) to postgres;

grant execute on function st_asgeojson(text) to anon;

grant execute on function st_asgeojson(text) to authenticated;

grant execute on function st_asgeojson(text) to service_role;

