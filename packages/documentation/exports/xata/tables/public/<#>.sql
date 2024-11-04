create operator <#> (procedure = geometry_distance_box, leftarg = geometry, rightarg = geometry, commutator = <#>);

alter operator <#>(geometry, geometry) owner to supabase_admin;

create operator <#> (procedure = vector_negative_inner_product, leftarg = vector, rightarg = vector, commutator = <#>);

alter operator <#>(vector, vector) owner to supabase_admin;

create operator <#> (procedure = halfvec_negative_inner_product, leftarg = halfvec, rightarg = halfvec, commutator = <#>);

alter operator <#>(halfvec, halfvec) owner to supabase_admin;

create operator <#> (procedure = sparsevec_negative_inner_product, leftarg = sparsevec, rightarg = sparsevec, commutator = <#>);

alter operator <#>(sparsevec, sparsevec) owner to supabase_admin;

