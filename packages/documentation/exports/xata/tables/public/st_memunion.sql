create aggregate st_memunion(geometry) (
    sfunc = st_union,
    stype = geometry,
    combinefunc = st_union,
    parallel = safe
    );

comment on aggregate st_memunion(geometry) is 'args: geomfield - Aggregate function which unions geometries in a memory-efficent but slower way';

alter aggregate st_memunion(geometry) owner to supabase_admin;

grant execute on function st_memunion(geometry) to postgres;

grant execute on function st_memunion(geometry) to anon;

grant execute on function st_memunion(geometry) to authenticated;

grant execute on function st_memunion(geometry) to service_role;

