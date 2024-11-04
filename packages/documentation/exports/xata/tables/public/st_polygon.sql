create function st_polygon(geometry, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$
	SELECT public.ST_SetSRID(public.ST_MakePolygon($1), $2)
	$$;

comment on function st_polygon(geometry, integer) is 'args: lineString, srid - Creates a Polygon from a LineString with a specified SRID.';

alter function st_polygon(geometry, integer) owner to supabase_admin;

grant execute on function st_polygon(geometry, integer) to postgres;

grant execute on function st_polygon(geometry, integer) to anon;

grant execute on function st_polygon(geometry, integer) to authenticated;

grant execute on function st_polygon(geometry, integer) to service_role;

