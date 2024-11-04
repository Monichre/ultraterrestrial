create operator family brin_geometry_inclusion_ops_4d using brin;

alter operator family brin_geometry_inclusion_ops_4d using brin add
    operator 3 &&&(geometry, gidx),
    operator 3 &&&(gidx, geometry),
    operator 3 &&&(geometry, geometry),
    operator 3 &&&(gidx, gidx),
    function 2(geometry, geometry) geom4d_brin_inclusion_add_value(internal, internal, internal, internal);

alter operator family brin_geometry_inclusion_ops_4d using brin owner to supabase_admin;

create operator class brin_geometry_inclusion_ops_4d for type geometry using brin as storage gidx operator 3 &&&(gidx, geometry),
	operator 3 &&&(geometry, gidx),
	operator 3 &&&(gidx, gidx),
	operator 3 &&&(geometry, geometry),
	function 4(geometry, geometry) brin_inclusion_union(internal,internal,internal),
	function 1(geometry, geometry) brin_inclusion_opcinfo(internal),
	function 3(geometry, geometry) brin_inclusion_consistent(internal,internal,internal),
	function 2(geometry, geometry) geom4d_brin_inclusion_add_value(internal, internal, internal, internal);

alter operator class brin_geometry_inclusion_ops_4d using brin owner to supabase_admin;

