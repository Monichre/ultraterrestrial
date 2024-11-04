create function st_geometricmedian(g geometry, tolerance double precision default NULL::double precision, max_iter integer default 10000, fail_if_not_converged boolean default false) returns geometry
    immutable
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_geometricmedian(geometry, double precision, integer, boolean) is 'args: geom, tolerance = NULL, max_iter = 10000, fail_if_not_converged = false - Returns the geometric median of a MultiPoint.';

alter function st_geometricmedian(geometry, double precision, integer, boolean) owner to supabase_admin;

grant execute on function st_geometricmedian(geometry, double precision, integer, boolean) to postgres;

grant execute on function st_geometricmedian(geometry, double precision, integer, boolean) to anon;

grant execute on function st_geometricmedian(geometry, double precision, integer, boolean) to authenticated;

grant execute on function st_geometricmedian(geometry, double precision, integer, boolean) to service_role;

