create function st_simplifyvw(geometry, double precision) returns geometry
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

comment on function st_simplifyvw(geometry, double precision) is 'args: geomA, tolerance - Returns a simplified version of a geometry, using the Visvalingam-Whyatt algorithm';

alter function st_simplifyvw(geometry, double precision) owner to supabase_admin;

grant execute on function st_simplifyvw(geometry, double precision) to postgres;

grant execute on function st_simplifyvw(geometry, double precision) to anon;

grant execute on function st_simplifyvw(geometry, double precision) to authenticated;

grant execute on function st_simplifyvw(geometry, double precision) to service_role;

