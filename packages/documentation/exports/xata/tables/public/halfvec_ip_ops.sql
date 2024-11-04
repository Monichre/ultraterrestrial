create operator family halfvec_ip_ops using ivfflat;

alter operator family halfvec_ip_ops using ivfflat add
    operator 1 <#>(halfvec, halfvec) for order by float_ops,
    function 4(halfvec, halfvec) l2_norm(halfvec),
    function 1(halfvec, halfvec) halfvec_negative_inner_product(halfvec, halfvec),
    function 3(halfvec, halfvec) halfvec_spherical_distance(halfvec, halfvec),
    function 5(halfvec, halfvec) ivfflat_halfvec_support(internal);

alter operator family halfvec_ip_ops using ivfflat owner to supabase_admin;

create operator class halfvec_ip_ops for type halfvec using ivfflat as
    operator 1 <#>(halfvec, halfvec) for order by float_ops,
    function 4(halfvec, halfvec) l2_norm(halfvec),
    function 3(halfvec, halfvec) halfvec_spherical_distance(halfvec, halfvec),
    function 1(halfvec, halfvec) halfvec_negative_inner_product(halfvec, halfvec),
    function 5(halfvec, halfvec) ivfflat_halfvec_support(internal);

alter operator class halfvec_ip_ops using ivfflat owner to supabase_admin;

create operator family halfvec_ip_ops using hnsw;

alter operator family halfvec_ip_ops using hnsw add
    operator 1 <#>(halfvec, halfvec) for order by float_ops,
    function 3(halfvec, halfvec) hnsw_halfvec_support(internal),
    function 1(halfvec, halfvec) halfvec_negative_inner_product(halfvec, halfvec);

alter operator family halfvec_ip_ops using hnsw owner to supabase_admin;

create operator class halfvec_ip_ops for type halfvec using hnsw as
    operator 1 <#>(halfvec, halfvec) for order by float_ops,
    function 1(halfvec, halfvec) halfvec_negative_inner_product(halfvec, halfvec),
    function 3(halfvec, halfvec) hnsw_halfvec_support(internal);

alter operator class halfvec_ip_ops using hnsw owner to supabase_admin;

