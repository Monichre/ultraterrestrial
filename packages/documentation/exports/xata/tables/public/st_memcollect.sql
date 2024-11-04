create aggregate st_memcollect(geometry) (
    sfunc = st_collect,
    stype = geometry,
    combinefunc = st_collect,
    parallel = safe
    );

alter aggregate st_memcollect(geometry) owner to supabase_admin;

grant execute on function st_memcollect(geometry) to postgres;

grant execute on function st_memcollect(geometry) to anon;

grant execute on function st_memcollect(geometry) to authenticated;

grant execute on function st_memcollect(geometry) to service_role;

