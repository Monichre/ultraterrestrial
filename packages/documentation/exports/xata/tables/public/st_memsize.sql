create function st_memsize(geometry) returns integer
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_memsize(geometry) is 'args: geomA - Returns the amount of memory space a geometry takes.';

alter function st_memsize(geometry) owner to supabase_admin;

grant execute on function st_memsize(geometry) to postgres;

grant execute on function st_memsize(geometry) to anon;

grant execute on function st_memsize(geometry) to authenticated;

grant execute on function st_memsize(geometry) to service_role;

