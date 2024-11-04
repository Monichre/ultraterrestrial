create function st_rotatex(geometry, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Affine($1, 1, 0, 0, 0, cos($2), -sin($2), 0, sin($2), cos($2), 0, 0, 0)$$;

comment on function st_rotatex(geometry, double precision) is 'args: geomA, rotRadians - Rotates a geometry about the X axis.';

alter function st_rotatex(geometry, double precision) owner to supabase_admin;

grant execute on function st_rotatex(geometry, double precision) to postgres;

grant execute on function st_rotatex(geometry, double precision) to anon;

grant execute on function st_rotatex(geometry, double precision) to authenticated;

grant execute on function st_rotatex(geometry, double precision) to service_role;

