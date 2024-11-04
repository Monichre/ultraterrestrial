create operator family spgist_geometry_ops_nd using spgist;

alter operator family spgist_geometry_ops_nd using spgist add
    operator 6 ~~=(geometry, geometry),
    operator 8 @@(geometry, geometry),
    operator 7 ~~(geometry, geometry),
    operator 3 &&&(geometry, geometry),
    function 4(geometry, geometry) geometry_spgist_inner_consistent_nd(internal, internal),
    function 2(geometry, geometry) geometry_spgist_choose_nd(internal, internal),
    function 5(geometry, geometry) geometry_spgist_leaf_consistent_nd(internal, internal),
    function 1(geometry, geometry) geometry_spgist_config_nd(internal, internal),
    function 6(geometry, geometry) geometry_spgist_compress_nd(internal),
    function 3(geometry, geometry) geometry_spgist_picksplit_nd(internal, internal);

alter operator family spgist_geometry_ops_nd using spgist owner to supabase_admin;

create operator class spgist_geometry_ops_nd for type geometry using spgist as
    function 2(geometry, geometry) geometry_spgist_choose_nd(internal, internal),
    function 5(geometry, geometry) geometry_spgist_leaf_consistent_nd(internal, internal),
    function 1(geometry, geometry) geometry_spgist_config_nd(internal, internal),
    function 4(geometry, geometry) geometry_spgist_inner_consistent_nd(internal, internal),
    function 3(geometry, geometry) geometry_spgist_picksplit_nd(internal, internal);

alter operator class spgist_geometry_ops_nd using spgist owner to supabase_admin;

