create operator family btree_geometry_ops using btree;

alter operator family btree_geometry_ops using btree add
    operator 5 >(geometry, geometry),
    operator 1 <(geometry, geometry),
    operator 3 =(geometry, geometry),
    operator 2 <=(geometry, geometry),
    operator 4 >=(geometry, geometry),
    function 1(geometry, geometry) geometry_cmp(geom1 geometry, geom2 geometry),
    function 2(geometry, geometry) geometry_sortsupport(internal);

alter operator family btree_geometry_ops using btree owner to supabase_admin;

create operator class btree_geometry_ops default for type geometry using btree as
    operator 4 >=(geometry, geometry),
    operator 5 >(geometry, geometry),
    operator 1 <(geometry, geometry),
    operator 2 <=(geometry, geometry),
    operator 3 =(geometry, geometry),
    function 1(geometry, geometry) geometry_cmp(geom1 geometry, geom2 geometry);

alter operator class btree_geometry_ops using btree owner to supabase_admin;

