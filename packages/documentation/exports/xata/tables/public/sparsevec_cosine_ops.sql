create operator family sparsevec_cosine_ops using hnsw;

alter operator family sparsevec_cosine_ops using hnsw add
    operator 1 <=>(sparsevec, sparsevec) for order by float_ops,
    function 1(sparsevec, sparsevec) sparsevec_negative_inner_product(sparsevec, sparsevec),
    function 2(sparsevec, sparsevec) l2_norm(sparsevec),
    function 3(sparsevec, sparsevec) hnsw_sparsevec_support(internal);

alter operator family sparsevec_cosine_ops using hnsw owner to supabase_admin;

create operator class sparsevec_cosine_ops for type sparsevec using hnsw as
    operator 1 <=>(sparsevec, sparsevec) for order by float_ops,
    function 2(sparsevec, sparsevec) l2_norm(sparsevec),
    function 3(sparsevec, sparsevec) hnsw_sparsevec_support(internal),
    function 1(sparsevec, sparsevec) sparsevec_negative_inner_product(sparsevec, sparsevec);

alter operator class sparsevec_cosine_ops using hnsw owner to supabase_admin;

