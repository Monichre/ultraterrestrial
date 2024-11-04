create operator family vector_cosine_ops using ivfflat;

alter operator family vector_cosine_ops using ivfflat add
    operator 1 <=>(vector, vector) for order by float_ops,
    function 2(vector, vector) vector_norm(vector),
    function 4(vector, vector) vector_norm(vector),
    function 3(vector, vector) vector_spherical_distance(vector, vector),
    function 1(vector, vector) vector_negative_inner_product(vector, vector);

alter operator family vector_cosine_ops using ivfflat owner to supabase_admin;

create operator class vector_cosine_ops for type vector using ivfflat as
    operator 1 <=>(vector, vector) for order by float_ops,
    function 1(vector, vector) vector_negative_inner_product(vector, vector),
    function 3(vector, vector) vector_spherical_distance(vector, vector),
    function 4(vector, vector) vector_norm(vector),
    function 2(vector, vector) vector_norm(vector);

alter operator class vector_cosine_ops using ivfflat owner to supabase_admin;

create operator family vector_cosine_ops using hnsw;

alter operator family vector_cosine_ops using hnsw add
    operator 1 <=>(vector, vector) for order by float_ops,
    function 2(vector, vector) vector_norm(vector),
    function 1(vector, vector) vector_negative_inner_product(vector, vector);

alter operator family vector_cosine_ops using hnsw owner to supabase_admin;

create operator class vector_cosine_ops for type vector using hnsw as
    operator 1 <=>(vector, vector) for order by float_ops,
    function 2(vector, vector) vector_norm(vector),
    function 1(vector, vector) vector_negative_inner_product(vector, vector);

alter operator class vector_cosine_ops using hnsw owner to supabase_admin;

