create function st_geomfromgeohash(text, integer DEFAULT NULL::integer) returns geometry
    immutable
    parallel safe
    cost 50
    language sql
as
$$ SELECT CAST(public.ST_Box2dFromGeoHash($1, $2) AS geometry); $$;

alter function st_geomfromgeohash(text, integer) owner to supabase_admin;

grant execute on function st_geomfromgeohash(text, integer) to postgres;

grant execute on function st_geomfromgeohash(text, integer) to anon;

grant execute on function st_geomfromgeohash(text, integer) to authenticated;

grant execute on function st_geomfromgeohash(text, integer) to service_role;

