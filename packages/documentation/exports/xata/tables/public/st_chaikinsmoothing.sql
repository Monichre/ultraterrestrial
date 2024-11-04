create function st_chaikinsmoothing(geometry, integer default 1, boolean default false) returns geometry
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

comment on function st_chaikinsmoothing(geometry, integer, boolean) is 'args: geom, nIterations = 1, preserveEndPoints = false - Returns a smoothed version of a geometry, using the Chaikin algorithm';

alter function st_chaikinsmoothing(geometry, integer, boolean) owner to supabase_admin;

grant execute on function st_chaikinsmoothing(geometry, integer, boolean) to postgres;

grant execute on function st_chaikinsmoothing(geometry, integer, boolean) to anon;

grant execute on function st_chaikinsmoothing(geometry, integer, boolean) to authenticated;

grant execute on function st_chaikinsmoothing(geometry, integer, boolean) to service_role;

