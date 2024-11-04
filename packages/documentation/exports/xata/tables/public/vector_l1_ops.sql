create operator family vector_l1_ops using hnsw;

alter operator family vector_l1_ops using hnsw add
    operator 1 <+>(vector, vector) for order by float_ops,
    function 1(vector, vector) l1_distance(vector, vector);

alter operator family vector_l1_ops using hnsw owner to supabase_admin;

create operator class vector_l1_ops for type vector using hnsw as
    operator 1 <+>(vector, vector) for order by float_ops,
    function 1(vector, vector) l1_distance(vector, vector);

alter operator class vector_l1_ops using hnsw owner to supabase_admin;

