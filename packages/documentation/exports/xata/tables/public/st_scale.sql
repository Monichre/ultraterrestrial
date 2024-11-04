create function st_scale(geometry, geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_scale(geometry, geometry) is 'args: geom, factor - Scales a geometry by given factors.';

alter function st_scale(geometry, geometry) owner to supabase_admin;

grant execute on function st_scale(geometry, geometry) to postgres;

grant execute on function st_scale(geometry, geometry) to anon;

grant execute on function st_scale(geometry, geometry) to authenticated;

grant execute on function st_scale(geometry, geometry) to service_role;

create function st_scale(geometry, geometry, origin geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_scale(geometry, geometry, geometry) is 'args: geom, factor, origin - Scales a geometry by given factors.';

alter function st_scale(geometry, geometry, geometry) owner to supabase_admin;

grant execute on function st_scale(geometry, geometry, geometry) to postgres;

grant execute on function st_scale(geometry, geometry, geometry) to anon;

grant execute on function st_scale(geometry, geometry, geometry) to authenticated;

grant execute on function st_scale(geometry, geometry, geometry) to service_role;

create function st_scale(geometry, double precision, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Scale($1, public.ST_MakePoint($2, $3, $4))$$;

comment on function st_scale(geometry, double precision, double precision, double precision) is 'args: geomA, XFactor, YFactor, ZFactor - Scales a geometry by given factors.';

alter function st_scale(geometry, double precision, double precision, double precision) owner to supabase_admin;

grant execute on function st_scale(geometry, double precision, double precision, double precision) to postgres;

grant execute on function st_scale(geometry, double precision, double precision, double precision) to anon;

grant execute on function st_scale(geometry, double precision, double precision, double precision) to authenticated;

grant execute on function st_scale(geometry, double precision, double precision, double precision) to service_role;

create function st_scale(geometry, double precision, double precision) returns geometry
    immutable
    strict
    parallel safe
    cost 50
    language sql
as
$$SELECT public.ST_Scale($1, $2, $3, 1)$$;

comment on function st_scale(geometry, double precision, double precision) is 'args: geomA, XFactor, YFactor - Scales a geometry by given factors.';

alter function st_scale(geometry, double precision, double precision) owner to supabase_admin;

grant execute on function st_scale(geometry, double precision, double precision) to postgres;

grant execute on function st_scale(geometry, double precision, double precision) to anon;

grant execute on function st_scale(geometry, double precision, double precision) to authenticated;

grant execute on function st_scale(geometry, double precision, double precision) to service_role;

