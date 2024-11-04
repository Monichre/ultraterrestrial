create operator family brin_geometry_inclusion_ops_3d using brin;

alter operator family brin_geometry_inclusion_ops_3d using brin add
    operator 3 &&&(gidx, geometry),
    operator 3 &&&(gidx, gidx),
    operator 3 &&&(geometry, geometry),
    operator 3 &&&(geometry, gidx),
    function 2(geometry, geometry) geom3d_brin_inclusion_add_value(internal, internal, internal, internal);

alter operator family brin_geometry_inclusion_ops_3d using brin owner to supabase_admin;

create operator class brin_geometry_inclusion_ops_3d for type geometry using brin as storage gidx operator 3 &&&(gidx, gidx),
	operator 3 &&&(geometry, gidx),
	operator 3 &&&(geometry, geometry),
	operator 3 &&&(gidx, geometry),
	function 4(geometry, geometry) brin_inclusion_union(internal,internal,internal),
	function 3(geometry, geometry) brin_inclusion_consistent(internal,internal,internal),
	function 2(geometry, geometry) geom3d_brin_inclusion_add_value(internal, internal, internal, internal),
	function 1(geometry, geometry) brin_inclusion_opcinfo(internal);

alter operator class brin_geometry_inclusion_ops_3d using brin owner to supabase_admin;

