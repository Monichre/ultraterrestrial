create operator family gist_geography_ops using gist;

alter operator family gist_geography_ops using gist add
    operator 3 &&(geography, geography),
    operator 13 <->(geography, geography) for order by float_ops,
    function 3(geography, geography) geography_gist_compress(internal),
    function 7(geography, geography) geography_gist_same(box2d, box2d, internal),
    function 8(geography, geography) geography_gist_distance(internal, geography, integer),
    function 4(geography, geography) geography_gist_decompress(internal),
    function 2(geography, geography) geography_gist_union(bytea, internal),
    function 6(geography, geography) geography_gist_picksplit(internal, internal),
    function 5(geography, geography) geography_gist_penalty(internal, internal, internal),
    function 1(geography, geography) geography_gist_consistent(internal, geography, integer);

alter operator family gist_geography_ops using gist owner to supabase_admin;

create operator class gist_geography_ops default for type geography using gist as storage gidx function 7(geography, geography) geography_gist_same(box2d, box2d, internal),
	function 2(geography, geography) geography_gist_union(bytea, internal),
	function 5(geography, geography) geography_gist_penalty(internal, internal, internal),
	function 6(geography, geography) geography_gist_picksplit(internal, internal),
	function 1(geography, geography) geography_gist_consistent(internal, geography, integer);

alter operator class gist_geography_ops using gist owner to supabase_admin;

