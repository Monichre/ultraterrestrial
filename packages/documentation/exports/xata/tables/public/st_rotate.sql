create function st_rotate(geometry, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Affine($1,  cos($2), -sin($2), 0,  sin($2), cos($2), 0,  0, 0, 1,  0, 0, 0)$$;

comment on function st_rotate(geometry, double precision) is 'args: geomA, rotRadians - Rotates a geometry about an origin point.';

alter function st_rotate(geometry, double precision) owner to supabase_admin;

grant execute on function st_rotate(geometry, double precision) to postgres;

grant execute on function st_rotate(geometry, double precision) to anon;

grant execute on function st_rotate(geometry, double precision) to authenticated;

grant execute on function st_rotate(geometry, double precision) to service_role;

create function st_rotate(geometry, double precision, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Affine($1,  cos($2), -sin($2), 0,  sin($2),  cos($2), 0, 0, 0, 1,	$3 - cos($2) * $3 + sin($2) * $4, $4 - sin($2) * $3 - cos($2) * $4, 0)$$;

comment on function st_rotate(geometry, double precision, double precision, double precision) is 'args: geomA, rotRadians, x0, y0 - Rotates a geometry about an origin point.';

alter function st_rotate(geometry, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_rotate(geometry, double precision, double precision, double precision) to postgres;

grant execute on function st_rotate(geometry, double precision, double precision, double precision) to anon;

grant execute on function st_rotate(geometry, double precision, double precision, double precision) to authenticated;

grant execute on function st_rotate(geometry, double precision, double precision, double precision) to service_role;

create function st_rotate(geometry, double precision, geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Affine($1,  cos($2), -sin($2), 0,  sin($2),  cos($2), 0, 0, 0, 1, public.ST_X($3) - cos($2) * public.ST_X($3) + sin($2) * public.ST_Y($3), public.ST_Y($3) - sin($2) * public.ST_X($3) - cos($2) * public.ST_Y($3), 0)$$;

comment on function st_rotate(geometry, double precision, geometry) is 'args: geomA, rotRadians, pointOrigin - Rotates a geometry about an origin point.';

alter function st_rotate(geometry, double precision, geometry) owner to supabase_admin;

grant execute on function st_rotate(geometry, double precision, geometry) to postgres;

grant execute on function st_rotate(geometry, double precision, geometry) to anon;

grant execute on function st_rotate(geometry, double precision, geometry) to authenticated;

grant execute on function st_rotate(geometry, double precision, geometry) to service_role;

