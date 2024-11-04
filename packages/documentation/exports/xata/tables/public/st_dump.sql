create function st_dump(geometry) returns setof setof geometry_dump
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

comment on function st_dump(geometry) is 'args: g1 - Returns a set of geometry_dump rows for the components of a geometry.';

alter function st_dump(geometry) owner to supabase_admin;

grant execute on function st_dump(geometry) to postgres;

grant execute on function st_dump(geometry) to anon;

grant execute on function st_dump(geometry) to authenticated;

grant execute on function st_dump(geometry) to service_role;

