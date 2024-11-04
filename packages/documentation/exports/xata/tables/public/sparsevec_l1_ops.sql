create operator family sparsevec_l1_ops using hnsw;

alter operator family sparsevec_l1_ops using hnsw add
    operator 1 <+>(sparsevec, sparsevec) for order by float_ops,
    function 1(sparsevec, sparsevec) l1_distance(sparsevec, sparsevec),
    function 3(sparsevec, sparsevec) hnsw_sparsevec_support(internal);

alter operator family sparsevec_l1_ops using hnsw owner to supabase_admin;

create operator class sparsevec_l1_ops for type sparsevec using hnsw as
    operator 1 <+>(sparsevec, sparsevec) for order by float_ops,
    function 3(sparsevec, sparsevec) hnsw_sparsevec_support(internal),
    function 1(sparsevec, sparsevec) l1_distance(sparsevec, sparsevec);

alter operator class sparsevec_l1_ops using hnsw owner to supabase_admin;

