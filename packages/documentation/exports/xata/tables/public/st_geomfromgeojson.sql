create function st_geomfromgeojson(text) returns geometry
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

alter function st_geomfromgeojson(text) owner to supabase_admin;

grant execute on function st_geomfromgeojson(text) to postgres;

grant execute on function st_geomfromgeojson(text) to anon;

grant execute on function st_geomfromgeojson(text) to authenticated;

grant execute on function st_geomfromgeojson(text) to service_role;

create function st_geomfromgeojson(json) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_GeomFromGeoJson($1::text)$$;

alter function st_geomfromgeojson(json) owner to supabase_admin;

grant execute on function st_geomfromgeojson(json) to postgres;

grant execute on function st_geomfromgeojson(json) to anon;

grant execute on function st_geomfromgeojson(json) to authenticated;

grant execute on function st_geomfromgeojson(json) to service_role;

create function st_geomfromgeojson(jsonb) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language sql
as
$$SELECT public.ST_GeomFromGeoJson($1::text)$$;

alter function st_geomfromgeojson(jsonb) owner to supabase_admin;

grant execute on function st_geomfromgeojson(jsonb) to postgres;

grant execute on function st_geomfromgeojson(jsonb) to anon;

grant execute on function st_geomfromgeojson(jsonb) to authenticated;

grant execute on function st_geomfromgeojson(jsonb) to service_role;

