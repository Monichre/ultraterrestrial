create function st_lineinterpolatepoints(geometry, double precision, repeat boolean default true) returns geometry
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

comment on function st_lineinterpolatepoints(geometry, double precision, boolean) is 'args: a_linestring, a_fraction, repeat - Returns points interpolated along a line at a fractional interval.';

alter function st_lineinterpolatepoints(geometry, double precision, boolean) owner to supabase_admin;

grant execute on function st_lineinterpolatepoints(geometry, double precision, boolean) to postgres;

grant execute on function st_lineinterpolatepoints(geometry, double precision, boolean) to anon;

grant execute on function st_lineinterpolatepoints(geometry, double precision, boolean) to authenticated;

grant execute on function st_lineinterpolatepoints(geometry, double precision, boolean) to service_role;

