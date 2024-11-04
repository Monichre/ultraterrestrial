create function st_simplifypolygonhull(geom geometry, vertex_fraction double precision, is_outer boolean default true) returns geometry
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

comment on function st_simplifypolygonhull(geometry, double precision, boolean) is 'args: param_geom, vertex_fraction, is_outer = true - Computes a simplifed topology-preserving outer or inner hull of a polygonal geometry.';

alter function st_simplifypolygonhull(geometry, double precision, boolean) owner to supabase_admin;

grant execute on function st_simplifypolygonhull(geometry, double precision, boolean) to postgres;

grant execute on function st_simplifypolygonhull(geometry, double precision, boolean) to anon;

grant execute on function st_simplifypolygonhull(geometry, double precision, boolean) to authenticated;

grant execute on function st_simplifypolygonhull(geometry, double precision, boolean) to service_role;

