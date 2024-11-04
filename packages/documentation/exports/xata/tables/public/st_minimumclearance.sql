create function st_minimumclearance(geometry) returns double precision
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

comment on function st_minimumclearance(geometry) is 'args: g - Returns the minimum clearance of a geometry, a measure of a geometrys robustness.';

alter function st_minimumclearance(geometry) owner to supabase_admin;

grant execute on function st_minimumclearance(geometry) to postgres;

grant execute on function st_minimumclearance(geometry) to anon;

grant execute on function st_minimumclearance(geometry) to authenticated;

grant execute on function st_minimumclearance(geometry) to service_role;

