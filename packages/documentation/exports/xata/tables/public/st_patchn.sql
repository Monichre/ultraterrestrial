create function st_patchn(geometry, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.ST_GeometryType($1) = 'ST_PolyhedralSurface'
	THEN public.ST_GeometryN($1, $2)
	ELSE NULL END
	$$;

comment on function st_patchn(geometry, integer) is 'args: geomA, n - Returns the Nth geometry (face) of a PolyhedralSurface.';

alter function st_patchn(geometry, integer) owner to supabase_admin;

grant execute on function st_patchn(geometry, integer) to postgres;

grant execute on function st_patchn(geometry, integer) to anon;

grant execute on function st_patchn(geometry, integer) to authenticated;

grant execute on function st_patchn(geometry, integer) to service_role;

