create function st_symmetricdifference(geom1 geometry, geom2 geometry) returns geometry
    language sql
as
$$SELECT ST_SymDifference(geom1, geom2, -1.0);$$;

alter function st_symmetricdifference(geometry, geometry) owner to supabase_admin;

grant execute on function st_symmetricdifference(geometry, geometry) to postgres;

grant execute on function st_symmetricdifference(geometry, geometry) to anon;

grant execute on function st_symmetricdifference(geometry, geometry) to authenticated;

grant execute on function st_symmetricdifference(geometry, geometry) to service_role;

