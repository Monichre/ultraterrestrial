create function get_proj4_from_srid(integer) returns text
    immutable
    strict
    parallel safe
    language plpgsql
as
$$
	BEGIN
	RETURN proj4text::text FROM public.spatial_ref_sys WHERE srid= $1;
	END;
	$$;

alter function get_proj4_from_srid(integer) owner to supabase_admin;

grant execute on function get_proj4_from_srid(integer) to postgres;

grant execute on function get_proj4_from_srid(integer) to anon;

grant execute on function get_proj4_from_srid(integer) to authenticated;

grant execute on function get_proj4_from_srid(integer) to service_role;

