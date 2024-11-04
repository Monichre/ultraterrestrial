create operator family vector_l2_ops using ivfflat;

alter operator family vector_l2_ops using ivfflat add
    operator 1 <->(vector, vector) for order by float_ops,
    function 3(vector, vector) l2_distance(vector, vector),
    function 1(vector, vector) vector_l2_squared_distance(vector, vector);

alter operator family vector_l2_ops using ivfflat owner to supabase_admin;

create operator class vector_l2_ops default for type vector using ivfflat as
    operator 1 <->(vector, vector) for order by float_ops,
    function 3(vector, vector) l2_distance(vector, vector),
    function 1(vector, vector) vector_l2_squared_distance(vector, vector);

alter operator class vector_l2_ops using ivfflat owner to supabase_admin;

create operator family vector_l2_ops using hnsw;

alter operator family vector_l2_ops using hnsw add
    operator 1 <->(vector, vector) for order by float_ops,
    function 1(vector, vector) vector_l2_squared_distance(vector, vector);

alter operator family vector_l2_ops using hnsw owner to supabase_admin;

create operator class vector_l2_ops for type vector using hnsw as
    operator 1 <->(vector, vector) for order by float_ops,
    function 1(vector, vector) vector_l2_squared_distance(vector, vector);

alter operator class vector_l2_ops using hnsw owner to supabase_admin;

