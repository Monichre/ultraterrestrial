create function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) is 'args: geomA, a, b, c, d, e, f, g, h, i, xoff, yoff, zoff - Apply a 3D affine transformation to a geometry.';

alter function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) to postgres;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) to anon;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) to authenticated;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision) to service_role;

create function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Affine($1,  $2, $3, 0,  $4, $5, 0,  0, 0, 1,  $6, $7, 0)$$;

comment on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision) is 'args: geomA, a, b, d, e, xoff, yoff - Apply a 3D affine transformation to a geometry.';

alter function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision) to postgres;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision) to anon;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision) to authenticated;

grant execute on function st_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision) to service_role;

