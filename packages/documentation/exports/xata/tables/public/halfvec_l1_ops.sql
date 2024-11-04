create operator family halfvec_l1_ops using hnsw;

alter operator family halfvec_l1_ops using hnsw add
    operator 1 <+>(halfvec, halfvec) for order by float_ops,
    function 3(halfvec, halfvec) hnsw_halfvec_support(internal),
    function 1(halfvec, halfvec) l1_distance(halfvec, halfvec);

alter operator family halfvec_l1_ops using hnsw owner to supabase_admin;

create operator class halfvec_l1_ops for type halfvec using hnsw as
    operator 1 <+>(halfvec, halfvec) for order by float_ops,
    function 3(halfvec, halfvec) hnsw_halfvec_support(internal),
    function 1(halfvec, halfvec) l1_distance(halfvec, halfvec);

alter operator class halfvec_l1_ops using hnsw owner to supabase_admin;

