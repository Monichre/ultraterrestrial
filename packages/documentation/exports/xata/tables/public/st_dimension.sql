create function st_dimension(geometry) returns integer
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

comment on function st_dimension(geometry) is 'args: g - Returns the topological dimension of a geometry.';

alter function st_dimension(geometry) owner to supabase_admin;

grant execute on function st_dimension(geometry) to postgres;

grant execute on function st_dimension(geometry) to anon;

grant execute on function st_dimension(geometry) to authenticated;

grant execute on function st_dimension(geometry) to service_role;

