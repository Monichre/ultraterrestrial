create operator family brin_geography_inclusion_ops using brin;

alter operator family brin_geography_inclusion_ops using brin add
    operator 3 &&(geography, gidx),
    operator 3 &&(geography, geography),
    operator 3 &&(gidx, geography),
    operator 3 &&(gidx, gidx),
    function 2(geography, geography) geog_brin_inclusion_add_value(internal, internal, internal, internal);

alter operator family brin_geography_inclusion_ops using brin owner to supabase_admin;

create operator class brin_geography_inclusion_ops default for type geography using brin as storage gidx operator 3 &&(gidx, geography),
	operator 3 &&(geography, gidx),
	operator 3 &&(geography, geography),
	operator 3 &&(gidx, gidx),
	function 1(geography, geography) brin_inclusion_opcinfo(internal),
	function 4(geography, geography) brin_inclusion_union(internal,internal,internal),
	function 3(geography, geography) brin_inclusion_consistent(internal,internal,internal),
	function 2(geography, geography) geog_brin_inclusion_add_value(internal, internal, internal, internal);

alter operator class brin_geography_inclusion_ops using brin owner to supabase_admin;

