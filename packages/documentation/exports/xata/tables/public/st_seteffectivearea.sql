create function st_seteffectivearea(geometry, double precision default '-1'::integer, integer default 1) returns geometry
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

comment on function st_seteffectivearea(geometry, double precision, integer) is 'args: geomA, threshold = 0, set_area = 1 - Sets the effective area for each vertex, using the Visvalingam-Whyatt algorithm.';

alter function st_seteffectivearea(geometry, double precision, integer) owner to supabase_admin;

grant execute on function st_seteffectivearea(geometry, double precision, integer) to postgres;

grant execute on function st_seteffectivearea(geometry, double precision, integer) to anon;

grant execute on function st_seteffectivearea(geometry, double precision, integer) to authenticated;

grant execute on function st_seteffectivearea(geometry, double precision, integer) to service_role;

