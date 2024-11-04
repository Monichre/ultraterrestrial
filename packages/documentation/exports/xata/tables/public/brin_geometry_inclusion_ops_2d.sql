create operator family brin_geometry_inclusion_ops_2d using brin;

alter operator family brin_geometry_inclusion_ops_2d using brin add
    operator 3 &&(box2df, box2df),
    operator 3 &&(geometry, geometry),
    operator 3 &&(box2df, geometry),
    operator 3 &&(geometry, box2df),
    operator 8 @(geometry, geometry),
    operator 7 ~(box2df, box2df),
    operator 7 ~(box2df, geometry),
    operator 7 ~(geometry, box2df),
    operator 7 ~(geometry, geometry),
    operator 8 @(box2df, box2df),
    operator 8 @(box2df, geometry),
    operator 8 @(geometry, box2df),
    function 2(geometry, geometry) geom2d_brin_inclusion_add_value(internal, internal, internal, internal);

alter operator family brin_geometry_inclusion_ops_2d using brin owner to supabase_admin;

create operator class brin_geometry_inclusion_ops_2d default for type geometry using brin as storage box2df operator 7 ~(geometry, box2df),
	operator 3 &&(geometry, box2df),
	operator 3 &&(geometry, geometry),
	operator 7 ~(box2df, box2df),
	operator 7 ~(box2df, geometry),
	operator 7 ~(geometry, geometry),
	operator 8 @(box2df, box2df),
	operator 8 @(box2df, geometry),
	operator 8 @(geometry, box2df),
	operator 8 @(geometry, geometry),
	operator 3 &&(box2df, geometry),
	operator 3 &&(box2df, box2df),
	function 4(geometry, geometry) brin_inclusion_union(internal,internal,internal),
	function 1(geometry, geometry) brin_inclusion_opcinfo(internal),
	function 3(geometry, geometry) brin_inclusion_consistent(internal,internal,internal),
	function 2(geometry, geometry) geom2d_brin_inclusion_add_value(internal, internal, internal, internal);

alter operator class brin_geometry_inclusion_ops_2d using brin owner to supabase_admin;

