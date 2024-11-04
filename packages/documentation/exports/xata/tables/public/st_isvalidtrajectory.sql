create function st_isvalidtrajectory(geometry) returns boolean
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

comment on function st_isvalidtrajectory(geometry) is 'args: line - Tests if the geometry is a valid trajectory.';

alter function st_isvalidtrajectory(geometry) owner to supabase_admin;

grant execute on function st_isvalidtrajectory(geometry) to postgres;

grant execute on function st_isvalidtrajectory(geometry) to anon;

grant execute on function st_isvalidtrajectory(geometry) to authenticated;

grant execute on function st_isvalidtrajectory(geometry) to service_role;

