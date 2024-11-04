create function st_transform(geometry, integer) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_transform(geometry, integer) is 'args: g1, srid - Return a new geometry with coordinates transformed to a different spatial reference system.';

alter function st_transform(geometry, integer) owner to supabase_admin;

grant execute on function st_transform(geometry, integer) to postgres;

grant execute on function st_transform(geometry, integer) to anon;

grant execute on function st_transform(geometry, integer) to authenticated;

grant execute on function st_transform(geometry, integer) to service_role;

create function st_transform(geom geometry, to_proj text) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$SELECT public.postgis_transform_geometry($1, proj4text, $2, 0)
	FROM spatial_ref_sys WHERE srid=public.ST_SRID($1);$$;

comment on function st_transform(geometry, text) is 'args: geom, to_proj - Return a new geometry with coordinates transformed to a different spatial reference system.';

alter function st_transform(geometry, text) owner to supabase_admin;

grant execute on function st_transform(geometry, text) to postgres;

grant execute on function st_transform(geometry, text) to anon;

grant execute on function st_transform(geometry, text) to authenticated;

grant execute on function st_transform(geometry, text) to service_role;

create function st_transform(geom geometry, from_proj text, to_proj text) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$SELECT public.postgis_transform_geometry($1, $2, $3, 0)$$;

comment on function st_transform(geometry, text, text) is 'args: geom, from_proj, to_proj - Return a new geometry with coordinates transformed to a different spatial reference system.';

alter function st_transform(geometry, text, text) owner to supabase_admin;

grant execute on function st_transform(geometry, text, text) to postgres;

grant execute on function st_transform(geometry, text, text) to anon;

grant execute on function st_transform(geometry, text, text) to authenticated;

grant execute on function st_transform(geometry, text, text) to service_role;

create function st_transform(geom geometry, from_proj text, to_srid integer) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$SELECT public.postgis_transform_geometry($1, $2, proj4text, $3)
	FROM spatial_ref_sys WHERE srid=$3;$$;

comment on function st_transform(geometry, text, integer) is 'args: geom, from_proj, to_srid - Return a new geometry with coordinates transformed to a different spatial reference system.';

alter function st_transform(geometry, text, integer) owner to supabase_admin;

grant execute on function st_transform(geometry, text, integer) to postgres;

grant execute on function st_transform(geometry, text, integer) to anon;

grant execute on function st_transform(geometry, text, integer) to authenticated;

grant execute on function st_transform(geometry, text, integer) to service_role;

