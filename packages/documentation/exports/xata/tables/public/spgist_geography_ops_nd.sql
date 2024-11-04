create operator family spgist_geography_ops_nd using spgist;

alter operator family spgist_geography_ops_nd using spgist add
    operator 3 &&(geography, geography),
    function 2(geography, geography) geography_spgist_choose_nd(internal, internal),
    function 1(geography, geography) geography_spgist_config_nd(internal, internal),
    function 6(geography, geography) geography_spgist_compress_nd(internal),
    function 5(geography, geography) geography_spgist_leaf_consistent_nd(internal, internal),
    function 4(geography, geography) geography_spgist_inner_consistent_nd(internal, internal),
    function 3(geography, geography) geography_spgist_picksplit_nd(internal, internal);

alter operator family spgist_geography_ops_nd using spgist owner to supabase_admin;

create operator class spgist_geography_ops_nd default for type geography using spgist as
    function 2(geography, geography) geography_spgist_choose_nd(internal, internal),
    function 1(geography, geography) geography_spgist_config_nd(internal, internal),
    function 5(geography, geography) geography_spgist_leaf_consistent_nd(internal, internal),
    function 4(geography, geography) geography_spgist_inner_consistent_nd(internal, internal),
    function 3(geography, geography) geography_spgist_picksplit_nd(internal, internal);

alter operator class spgist_geography_ops_nd using spgist owner to supabase_admin;

