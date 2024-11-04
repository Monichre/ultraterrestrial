create function st_forcepolygonccw(geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$ SELECT public.ST_Reverse(public.ST_ForcePolygonCW($1)) $$;

comment on function st_forcepolygonccw(geometry) is 'args: geom - Orients all exterior rings counter-clockwise and all interior rings clockwise.';

alter function st_forcepolygonccw(geometry) owner to supabase_admin;

grant execute on function st_forcepolygonccw(geometry) to postgres;

grant execute on function st_forcepolygonccw(geometry) to anon;

grant execute on function st_forcepolygonccw(geometry) to authenticated;

grant execute on function st_forcepolygonccw(geometry) to service_role;

