create function st_dumpsegments(geometry) returns setof setof geometry_dump
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

comment on function st_dumpsegments(geometry) is 'args: geom - Returns a set of geometry_dump rows for the segments in a geometry.';

alter function st_dumpsegments(geometry) owner to supabase_admin;

grant execute on function st_dumpsegments(geometry) to postgres;

grant execute on function st_dumpsegments(geometry) to anon;

grant execute on function st_dumpsegments(geometry) to authenticated;

grant execute on function st_dumpsegments(geometry) to service_role;

