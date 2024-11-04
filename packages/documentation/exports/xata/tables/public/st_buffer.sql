create function st_buffer(geom geometry, radius double precision, options text default ''::text) returns geometry
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

comment on function st_buffer(geometry, double precision, text) is 'args: g1, radius_of_buffer, buffer_style_parameters = '' - Computes a geometry covering all points within a given distance from a geometry.';

alter function st_buffer(geometry, double precision, text) owner to supabase_admin;

grant execute on function st_buffer(geometry, double precision, text) to postgres;

grant execute on function st_buffer(geometry, double precision, text) to anon;

grant execute on function st_buffer(geometry, double precision, text) to authenticated;

grant execute on function st_buffer(geometry, double precision, text) to service_role;

create function st_buffer(geom geometry, radius double precision, quadsegs integer) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$ SELECT public.ST_Buffer($1, $2, CAST('quad_segs='||CAST($3 AS text) as text)) $$;

comment on function st_buffer(geometry, double precision, integer) is 'args: g1, radius_of_buffer, num_seg_quarter_circle - Computes a geometry covering all points within a given distance from a geometry.';

alter function st_buffer(geometry, double precision, integer) owner to supabase_admin;

grant execute on function st_buffer(geometry, double precision, integer) to postgres;

grant execute on function st_buffer(geometry, double precision, integer) to anon;

grant execute on function st_buffer(geometry, double precision, integer) to authenticated;

grant execute on function st_buffer(geometry, double precision, integer) to service_role;

create function st_buffer(geography, double precision) returns geography
    immutable
    strict
    parallel safe
    language sql
as
$$SELECT public.geography(public.ST_Transform(public.ST_Buffer(public.ST_Transform(public.geometry($1), public._ST_BestSRID($1)), $2), 4326))$$;

alter function st_buffer(geography, double precision) owner to supabase_admin;

grant execute on function st_buffer(geography, double precision) to postgres;

grant execute on function st_buffer(geography, double precision) to anon;

grant execute on function st_buffer(geography, double precision) to authenticated;

grant execute on function st_buffer(geography, double precision) to service_role;

create function st_buffer(geography, double precision, integer) returns geography
    immutable
    strict
    parallel safe
    language sql
as
$$SELECT public.geography(public.ST_Transform(public.ST_Buffer(public.ST_Transform(public.geometry($1), public._ST_BestSRID($1)), $2, $3), 4326))$$;

comment on function st_buffer(geography, double precision, integer) is 'args: g1, radius_of_buffer, num_seg_quarter_circle - Computes a geometry covering all points within a given distance from a geometry.';

alter function st_buffer(geography, double precision, integer) owner to supabase_admin;

grant execute on function st_buffer(geography, double precision, integer) to postgres;

grant execute on function st_buffer(geography, double precision, integer) to anon;

grant execute on function st_buffer(geography, double precision, integer) to authenticated;

grant execute on function st_buffer(geography, double precision, integer) to service_role;

create function st_buffer(geography, double precision, text) returns geography
    immutable
    strict
    parallel safe
    language sql
as
$$SELECT public.geography(public.ST_Transform(public.ST_Buffer(public.ST_Transform(public.geometry($1), public._ST_BestSRID($1)), $2, $3), 4326))$$;

comment on function st_buffer(geography, double precision, text) is 'args: g1, radius_of_buffer, buffer_style_parameters - Computes a geometry covering all points within a given distance from a geometry.';

alter function st_buffer(geography, double precision, text) owner to supabase_admin;

grant execute on function st_buffer(geography, double precision, text) to postgres;

grant execute on function st_buffer(geography, double precision, text) to anon;

grant execute on function st_buffer(geography, double precision, text) to authenticated;

grant execute on function st_buffer(geography, double precision, text) to service_role;

create function st_buffer(text, double precision) returns geometry
    immutable
    strict
    parallel safe
    language sql
as
$$ SELECT public.ST_Buffer($1::public.geometry, $2);  $$;

alter function st_buffer(text, double precision) owner to supabase_admin;

grant execute on function st_buffer(text, double precision) to postgres;

grant execute on function st_buffer(text, double precision) to anon;

grant execute on function st_buffer(text, double precision) to authenticated;

grant execute on function st_buffer(text, double precision) to service_role;

create function st_buffer(text, double precision, integer) returns geometry
    immutable
    strict
    parallel safe
    language sql
as
$$ SELECT public.ST_Buffer($1::public.geometry, $2, $3);  $$;

alter function st_buffer(text, double precision, integer) owner to supabase_admin;

grant execute on function st_buffer(text, double precision, integer) to postgres;

grant execute on function st_buffer(text, double precision, integer) to anon;

grant execute on function st_buffer(text, double precision, integer) to authenticated;

grant execute on function st_buffer(text, double precision, integer) to service_role;

create function st_buffer(text, double precision, text) returns geometry
    immutable
    strict
    parallel safe
    language sql
as
$$ SELECT public.ST_Buffer($1::public.geometry, $2, $3);  $$;

alter function st_buffer(text, double precision, text) owner to supabase_admin;

grant execute on function st_buffer(text, double precision, text) to postgres;

grant execute on function st_buffer(text, double precision, text) to anon;

grant execute on function st_buffer(text, double precision, text) to authenticated;

grant execute on function st_buffer(text, double precision, text) to service_role;

