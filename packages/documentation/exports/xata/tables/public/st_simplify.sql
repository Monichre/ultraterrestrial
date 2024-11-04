create function st_simplify(geometry, double precision) returns geometry
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

comment on function st_simplify(geometry, double precision) is 'args: geomA, tolerance - Returns a simplified version of a geometry, using the Douglas-Peucker algorithm.';

alter function st_simplify(geometry, double precision) owner to supabase_admin;

grant execute on function st_simplify(geometry, double precision) to postgres;

grant execute on function st_simplify(geometry, double precision) to anon;

grant execute on function st_simplify(geometry, double precision) to authenticated;

grant execute on function st_simplify(geometry, double precision) to service_role;

create function st_simplify(geometry, double precision, boolean) returns geometry
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

comment on function st_simplify(geometry, double precision, boolean) is 'args: geomA, tolerance, preserveCollapsed - Returns a simplified version of a geometry, using the Douglas-Peucker algorithm.';

alter function st_simplify(geometry, double precision, boolean) owner to supabase_admin;

grant execute on function st_simplify(geometry, double precision, boolean) to postgres;

grant execute on function st_simplify(geometry, double precision, boolean) to anon;

grant execute on function st_simplify(geometry, double precision, boolean) to authenticated;

grant execute on function st_simplify(geometry, double precision, boolean) to service_role;

