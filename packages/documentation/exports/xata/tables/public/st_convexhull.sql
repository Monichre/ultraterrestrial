create function st_convexhull(geometry) returns geometry
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

comment on function st_convexhull(geometry) is 'args: geomA - Computes the convex hull of a geometry.';

alter function st_convexhull(geometry) owner to supabase_admin;

grant execute on function st_convexhull(geometry) to postgres;

grant execute on function st_convexhull(geometry) to anon;

grant execute on function st_convexhull(geometry) to authenticated;

grant execute on function st_convexhull(geometry) to service_role;

