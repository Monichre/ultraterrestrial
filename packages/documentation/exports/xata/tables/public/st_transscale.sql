create function st_transscale(geometry, double precision, double precision, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Affine($1,  $4, 0, 0,  0, $5, 0,
		0, 0, 1,  $2 * $4, $3 * $5, 0)$$;

comment on function st_transscale(geometry, double precision, double precision, double precision, double precision) is 'args: geomA, deltaX, deltaY, XFactor, YFactor - Translates and scales a geometry by given offsets and factors.';

alter function st_transscale(geometry, double precision, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_transscale(geometry, double precision, double precision, double precision, double precision) to postgres;

grant execute on function st_transscale(geometry, double precision, double precision, double precision, double precision) to anon;

grant execute on function st_transscale(geometry, double precision, double precision, double precision, double precision) to authenticated;

grant execute on function st_transscale(geometry, double precision, double precision, double precision, double precision) to service_role;

