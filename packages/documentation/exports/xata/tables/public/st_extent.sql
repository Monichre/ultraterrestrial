create aggregate st_extent(geometry) (
    sfunc = st_combinebbox,
    stype = box3d,
    finalfunc = box2d,
    combinefunc = st_combinebbox,
    parallel = safe
    );

comment on aggregate st_extent(geometry) is 'args: geomfield - Aggregate function that returns the bounding box of geometries.';

alter aggregate st_extent(geometry) owner to supabase_admin;

grant execute on function st_extent(geometry) to postgres;

grant execute on function st_extent(geometry) to anon;

grant execute on function st_extent(geometry) to authenticated;

grant execute on function st_extent(geometry) to service_role;

