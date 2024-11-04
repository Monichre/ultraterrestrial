create function st_numpatches(geometry) returns integer
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT CASE WHEN public.ST_GeometryType($1) = 'ST_PolyhedralSurface'
	THEN public.ST_NumGeometries($1)
	ELSE NULL END
	$$;

comment on function st_numpatches(geometry) is 'args: g1 - Return the number of faces on a Polyhedral Surface. Will return null for non-polyhedral geometries.';

alter function st_numpatches(geometry) owner to supabase_admin;

grant execute on function st_numpatches(geometry) to postgres;

grant execute on function st_numpatches(geometry) to anon;

grant execute on function st_numpatches(geometry) to authenticated;

grant execute on function st_numpatches(geometry) to service_role;

