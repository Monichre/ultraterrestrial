create operator family spgist_geometry_ops_2d using spgist;

alter operator family spgist_geometry_ops_2d using spgist add
    operator 11 |>>(geometry, geometry),
    operator 1 <<(geometry, geometry),
    operator 2 &<(geometry, geometry),
    operator 3 &&(geometry, geometry),
    operator 4 &>(geometry, geometry),
    operator 5 >>(geometry, geometry),
    operator 6 ~=(geometry, geometry),
    operator 7 ~(geometry, geometry),
    operator 8 @(geometry, geometry),
    operator 9 &<|(geometry, geometry),
    operator 10 <<|(geometry, geometry),
    operator 12 |&>(geometry, geometry),
    function 3(geometry, geometry) geometry_spgist_picksplit_2d(internal, internal),
    function 4(geometry, geometry) geometry_spgist_inner_consistent_2d(internal, internal),
    function 5(geometry, geometry) geometry_spgist_leaf_consistent_2d(internal, internal),
    function 1(geometry, geometry) geometry_spgist_config_2d(internal, internal),
    function 2(geometry, geometry) geometry_spgist_choose_2d(internal, internal),
    function 6(geometry, geometry) geometry_spgist_compress_2d(internal);

alter operator family spgist_geometry_ops_2d using spgist owner to supabase_admin;

create operator class spgist_geometry_ops_2d default for type geometry using spgist as
    function 5(geometry, geometry) geometry_spgist_leaf_consistent_2d(internal, internal),
    function 4(geometry, geometry) geometry_spgist_inner_consistent_2d(internal, internal),
    function 1(geometry, geometry) geometry_spgist_config_2d(internal, internal),
    function 3(geometry, geometry) geometry_spgist_picksplit_2d(internal, internal),
    function 2(geometry, geometry) geometry_spgist_choose_2d(internal, internal);

alter operator class spgist_geometry_ops_2d using spgist owner to supabase_admin;

