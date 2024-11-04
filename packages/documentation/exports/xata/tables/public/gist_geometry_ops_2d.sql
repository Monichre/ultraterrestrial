create operator family gist_geometry_ops_2d using gist;

alter operator family gist_geometry_ops_2d using gist add
    operator 9 &<|(geometry, geometry),
    operator 1 <<(geometry, geometry),
    operator 2 &<(geometry, geometry),
    operator 3 &&(geometry, geometry),
    operator 4 &>(geometry, geometry),
    operator 5 >>(geometry, geometry),
    operator 6 ~=(geometry, geometry),
    operator 7 ~(geometry, geometry),
    operator 8 @(geometry, geometry),
    operator 10 <<|(geometry, geometry),
    operator 11 |>>(geometry, geometry),
    operator 12 |&>(geometry, geometry),
    operator 13 <->(geometry, geometry) for order by float_ops,
    operator 14 <#>(geometry, geometry) for order by float_ops,
    function 4(geometry, geometry) geometry_gist_decompress_2d(internal),
    function 3(geometry, geometry) geometry_gist_compress_2d(internal),
    function 2(geometry, geometry) geometry_gist_union_2d(bytea, internal),
    function 1(geometry, geometry) geometry_gist_consistent_2d(internal, geometry, integer),
    function 11(geometry, geometry) geometry_gist_sortsupport_2d(internal),
    function 8(geometry, geometry) geometry_gist_distance_2d(internal, geometry, integer),
    function 7(geometry, geometry) geometry_gist_same_2d(geom1 geometry, geom2 geometry, internal),
    function 6(geometry, geometry) geometry_gist_picksplit_2d(internal, internal),
    function 5(geometry, geometry) geometry_gist_penalty_2d(internal, internal, internal);

alter operator family gist_geometry_ops_2d using gist owner to supabase_admin;

create operator class gist_geometry_ops_2d default for type geometry using gist as storage box2df function 5(geometry, geometry) geometry_gist_penalty_2d(internal, internal, internal),
	function 1(geometry, geometry) geometry_gist_consistent_2d(internal, geometry, integer),
	function 2(geometry, geometry) geometry_gist_union_2d(bytea, internal),
	function 7(geometry, geometry) geometry_gist_same_2d(geom1 geometry, geom2 geometry, internal),
	function 6(geometry, geometry) geometry_gist_picksplit_2d(internal, internal);

alter operator class gist_geometry_ops_2d using gist owner to supabase_admin;

