create operator family bit_jaccard_ops using hnsw;

alter operator family bit_jaccard_ops using hnsw add
    operator 1 <%>(bit, bit) for order by float_ops,
    function 1(bit, bit) jaccard_distance(bit, bit),
    function 3(bit, bit) hnsw_bit_support(internal);

alter operator family bit_jaccard_ops using hnsw owner to supabase_admin;

create operator class bit_jaccard_ops for type bit using hnsw as
    operator 1 <%>(bit, bit) for order by float_ops,
    function 3(bit, bit) hnsw_bit_support(internal),
    function 1(bit, bit) jaccard_distance(bit, bit);

alter operator class bit_jaccard_ops using hnsw owner to supabase_admin;

