create function st_asx3d(geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0) returns text
    immutable
    parallel safe
    cost 500
    language sql
as
$$SELECT public._ST_AsX3D(3,$1,$2,$3,'');$$;

alter function st_asx3d(geometry, integer, integer) owner to supabase_admin;

grant execute on function st_asx3d(geometry, integer, integer) to postgres;

grant execute on function st_asx3d(geometry, integer, integer) to anon;

grant execute on function st_asx3d(geometry, integer, integer) to authenticated;

grant execute on function st_asx3d(geometry, integer, integer) to service_role;

