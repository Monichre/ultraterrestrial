create operator family spgist_geometry_ops_3d using spgist;

alter operator family spgist_geometry_ops_3d using spgist add
    operator 8 <<@(geometry, geometry),
    operator 3 &/&(geometry, geometry),
    operator 6 ~==(geometry, geometry),
    operator 7 @>>(geometry, geometry),
    function 1(geometry, geometry) geometry_spgist_config_3d(internal, internal),
    function 5(geometry, geometry) geometry_spgist_leaf_consistent_3d(internal, internal),
    function 6(geometry, geometry) geometry_spgist_compress_3d(internal),
    function 3(geometry, geometry) geometry_spgist_picksplit_3d(internal, internal),
    function 2(geometry, geometry) geometry_spgist_choose_3d(internal, internal),
    function 4(geometry, geometry) geometry_spgist_inner_consistent_3d(internal, internal);

alter operator family spgist_geometry_ops_3d using spgist owner to supabase_admin;

create operator class spgist_geometry_ops_3d for type geometry using spgist as
    function 1(geometry, geometry) geometry_spgist_config_3d(internal, internal),
    function 2(geometry, geometry) geometry_spgist_choose_3d(internal, internal),
    function 5(geometry, geometry) geometry_spgist_leaf_consistent_3d(internal, internal),
    function 4(geometry, geometry) geometry_spgist_inner_consistent_3d(internal, internal),
    function 3(geometry, geometry) geometry_spgist_picksplit_3d(internal, internal);

alter operator class spgist_geometry_ops_3d using spgist owner to supabase_admin;

