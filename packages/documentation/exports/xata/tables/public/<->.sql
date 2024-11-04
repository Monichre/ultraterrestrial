create operator <-> (procedure = geometry_distance_centroid, leftarg = geometry, rightarg = geometry, commutator = <->);

alter operator <->(geometry, geometry) owner to supabase_admin;

create operator <-> (procedure = geography_distance_knn, leftarg = geography, rightarg = geography, commutator = <->);

alter operator <->(geography, geography) owner to supabase_admin;

create operator <-> (procedure = l2_distance, leftarg = vector, rightarg = vector, commutator = <->);

alter operator <->(vector, vector) owner to supabase_admin;

create operator <-> (procedure = l2_distance, leftarg = halfvec, rightarg = halfvec, commutator = <->);

alter operator <->(halfvec, halfvec) owner to supabase_admin;

create operator <-> (procedure = l2_distance, leftarg = sparsevec, rightarg = sparsevec, commutator = <->);

alter operator <->(sparsevec, sparsevec) owner to supabase_admin;

