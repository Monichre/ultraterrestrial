create function st_minimumclearanceline(geometry) returns geometry
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

comment on function st_minimumclearanceline(geometry) is 'args: g - Returns the two-point LineString spanning a geometrys minimum clearance.';

alter function st_minimumclearanceline(geometry) owner to supabase_admin;

grant execute on function st_minimumclearanceline(geometry) to postgres;

grant execute on function st_minimumclearanceline(geometry) to anon;

grant execute on function st_minimumclearanceline(geometry) to authenticated;

grant execute on function st_minimumclearanceline(geometry) to service_role;

