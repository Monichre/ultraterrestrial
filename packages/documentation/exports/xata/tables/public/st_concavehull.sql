create function st_concavehull(param_geom geometry, param_pctconvex double precision, param_allow_holes boolean default false) returns geometry
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

comment on function st_concavehull(geometry, double precision, boolean) is 'args: param_geom, param_pctconvex, param_allow_holes = false - Computes a possibly concave geometry that encloses all input geometry vertices';

alter function st_concavehull(geometry, double precision, boolean) owner to supabase_admin;

grant execute on function st_concavehull(geometry, double precision, boolean) to postgres;

grant execute on function st_concavehull(geometry, double precision, boolean) to anon;

grant execute on function st_concavehull(geometry, double precision, boolean) to authenticated;

grant execute on function st_concavehull(geometry, double precision, boolean) to service_role;

