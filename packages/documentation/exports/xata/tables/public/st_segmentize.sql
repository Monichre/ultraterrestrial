create function st_segmentize(geometry, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_segmentize(geometry, double precision) is 'args: geom, max_segment_length - Return a modified geometry/geography having no segment longer than the given distance.';

alter function st_segmentize(geometry, double precision) owner to supabase_admin;

grant execute on function st_segmentize(geometry, double precision) to postgres;

grant execute on function st_segmentize(geometry, double precision) to anon;

grant execute on function st_segmentize(geometry, double precision) to authenticated;

grant execute on function st_segmentize(geometry, double precision) to service_role;

create function st_segmentize(geog geography, max_segment_length double precision) returns geography
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_segmentize(geography, double precision) is 'args: geog, max_segment_length - Return a modified geometry/geography having no segment longer than the given distance.';

alter function st_segmentize(geography, double precision) owner to supabase_admin;

grant execute on function st_segmentize(geography, double precision) to postgres;

grant execute on function st_segmentize(geography, double precision) to anon;

grant execute on function st_segmentize(geography, double precision) to authenticated;

grant execute on function st_segmentize(geography, double precision) to service_role;

