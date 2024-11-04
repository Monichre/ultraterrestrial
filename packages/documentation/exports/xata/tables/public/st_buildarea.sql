create function st_buildarea(geometry) returns geometry
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

comment on function st_buildarea(geometry) is 'args: geom - Creates a polygonal geometry formed by the linework of a geometry.';

alter function st_buildarea(geometry) owner to supabase_admin;

grant execute on function st_buildarea(geometry) to postgres;

grant execute on function st_buildarea(geometry) to anon;

grant execute on function st_buildarea(geometry) to authenticated;

grant execute on function st_buildarea(geometry) to service_role;

