create aggregate st_3dextent(geometry) (
    sfunc = st_combinebbox,
    stype = box3d,
    combinefunc = st_combinebbox,
    parallel = safe
    );

comment on aggregate st_3dextent(geometry) is 'args: geomfield - Aggregate function that returns the 3D bounding box of geometries.';

alter aggregate st_3dextent(geometry) owner to supabase_admin;

grant execute on function st_3dextent(geometry) to postgres;

grant execute on function st_3dextent(geometry) to anon;

grant execute on function st_3dextent(geometry) to authenticated;

grant execute on function st_3dextent(geometry) to service_role;

