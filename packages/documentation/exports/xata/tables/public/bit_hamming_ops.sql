create operator family bit_hamming_ops using ivfflat;

alter operator family bit_hamming_ops using ivfflat add
    operator 1 <~>(bit, bit) for order by float_ops,
    function 5(bit, bit) ivfflat_bit_support(internal),
    function 1(bit, bit) hamming_distance(bit, bit),
    function 3(bit, bit) hamming_distance(bit, bit);

alter operator family bit_hamming_ops using ivfflat owner to supabase_admin;

create operator class bit_hamming_ops for type bit using ivfflat as
    operator 1 <~>(bit, bit) for order by float_ops,
    function 3(bit, bit) hamming_distance(bit, bit),
    function 1(bit, bit) hamming_distance(bit, bit),
    function 5(bit, bit) ivfflat_bit_support(internal);

alter operator class bit_hamming_ops using ivfflat owner to supabase_admin;

create operator family bit_hamming_ops using hnsw;

alter operator family bit_hamming_ops using hnsw add
    operator 1 <~>(bit, bit) for order by float_ops,
    function 1(bit, bit) hamming_distance(bit, bit),
    function 3(bit, bit) hnsw_bit_support(internal);

alter operator family bit_hamming_ops using hnsw owner to supabase_admin;

create operator class bit_hamming_ops for type bit using hnsw as
    operator 1 <~>(bit, bit) for order by float_ops,
    function 1(bit, bit) hamming_distance(bit, bit),
    function 3(bit, bit) hnsw_bit_support(internal);

alter operator class bit_hamming_ops using hnsw owner to supabase_admin;

