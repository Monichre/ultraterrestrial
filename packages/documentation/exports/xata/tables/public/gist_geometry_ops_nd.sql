create operator family gist_geometry_ops_nd using gist;

alter operator family gist_geometry_ops_nd using gist add
    operator 6 ~~=(geometry, geometry),
    operator 3 &&&(geometry, geometry),
    operator 8 @@(geometry, geometry),
    operator 7 ~~(geometry, geometry),
    operator 20 |=|(geometry, geometry) for order by float_ops,
    operator 13 <<->>(geometry, geometry) for order by float_ops,
    function 7(geometry, geometry) geometry_gist_same_nd(geometry, geometry, internal),
    function 8(geometry, geometry) geometry_gist_distance_nd(internal, geometry, integer),
    function 1(geometry, geometry) geometry_gist_consistent_nd(internal, geometry, integer),
    function 2(geometry, geometry) geometry_gist_union_nd(bytea, internal),
    function 3(geometry, geometry) geometry_gist_compress_nd(internal),
    function 4(geometry, geometry) geometry_gist_decompress_nd(internal),
    function 5(geometry, geometry) geometry_gist_penalty_nd(internal, internal, internal),
    function 6(geometry, geometry) geometry_gist_picksplit_nd(internal, internal);

alter operator family gist_geometry_ops_nd using gist owner to supabase_admin;

create operator class gist_geometry_ops_nd for type geometry using gist as storage gidx function 7(geometry, geometry) geometry_gist_same_nd(geometry, geometry, internal),
	function 6(geometry, geometry) geometry_gist_picksplit_nd(internal, internal),
	function 5(geometry, geometry) geometry_gist_penalty_nd(internal, internal, internal),
	function 1(geometry, geometry) geometry_gist_consistent_nd(internal, geometry, integer),
	function 2(geometry, geometry) geometry_gist_union_nd(bytea, internal);

alter operator class gist_geometry_ops_nd using gist owner to supabase_admin;

