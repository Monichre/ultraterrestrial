create function st_rotatez(geometry, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Rotate($1, $2)$$;

comment on function st_rotatez(geometry, double precision) is 'args: geomA, rotRadians - Rotates a geometry about the Z axis.';

alter function st_rotatez(geometry, double precision) owner to supabase_admin;

grant execute on function st_rotatez(geometry, double precision) to postgres;

grant execute on function st_rotatez(geometry, double precision) to anon;

grant execute on function st_rotatez(geometry, double precision) to authenticated;

grant execute on function st_rotatez(geometry, double precision) to service_role;

