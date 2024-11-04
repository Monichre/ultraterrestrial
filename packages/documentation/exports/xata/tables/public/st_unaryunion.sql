create function st_unaryunion(geometry, gridsize double precision default '-1.0'::numeric) returns geometry
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

comment on function st_unaryunion(geometry, double precision) is 'args: geom, gridSize = -1 - Computes the union of the components of a single geometry.';

alter function st_unaryunion(geometry, double precision) owner to supabase_admin;

grant execute on function st_unaryunion(geometry, double precision) to postgres;

grant execute on function st_unaryunion(geometry, double precision) to anon;

grant execute on function st_unaryunion(geometry, double precision) to authenticated;

grant execute on function st_unaryunion(geometry, double precision) to service_role;

