create function st_isempty(geometry) returns boolean
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

comment on function st_isempty(geometry) is 'args: geomA - Tests if a geometry is empty.';

alter function st_isempty(geometry) owner to supabase_admin;

grant execute on function st_isempty(geometry) to postgres;

grant execute on function st_isempty(geometry) to anon;

grant execute on function st_isempty(geometry) to authenticated;

grant execute on function st_isempty(geometry) to service_role;

