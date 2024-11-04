create function st_quantizecoordinates(g geometry, prec_x integer, prec_y integer default NULL::integer, prec_z integer default NULL::integer, prec_m integer default NULL::integer) returns geometry
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_quantizecoordinates(geometry, integer, integer, integer, integer) is 'args: g, prec_x, prec_y, prec_z, prec_m - Sets least significant bits of coordinates to zero';

alter function st_quantizecoordinates(geometry, integer, integer, integer, integer) owner to supabase_admin;

grant execute on function st_quantizecoordinates(geometry, integer, integer, integer, integer) to postgres;

grant execute on function st_quantizecoordinates(geometry, integer, integer, integer, integer) to anon;

grant execute on function st_quantizecoordinates(geometry, integer, integer, integer, integer) to authenticated;

grant execute on function st_quantizecoordinates(geometry, integer, integer, integer, integer) to service_role;

