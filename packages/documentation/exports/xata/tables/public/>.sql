create operator > (procedure = geometry_gt, leftarg = geometry, rightarg = geometry, commutator = <, negator = <=, join = contjoinsel, restrict = contsel);

alter operator >(geometry, geometry) owner to supabase_admin;

create operator > (procedure = geography_gt, leftarg = geography, rightarg = geography, commutator = <, negator = <=, join = contjoinsel, restrict = contsel);

alter operator >(geography, geography) owner to supabase_admin;

create operator > (procedure = vector_gt, leftarg = vector, rightarg = vector, commutator = <, negator = <=, join = scalargtjoinsel, restrict = scalargtsel);

alter operator >(vector, vector) owner to supabase_admin;

create operator > (procedure = halfvec_gt, leftarg = halfvec, rightarg = halfvec, commutator = <, negator = <=, join = scalargtjoinsel, restrict = scalargtsel);

alter operator >(halfvec, halfvec) owner to supabase_admin;

create operator > (procedure = sparsevec_gt, leftarg = sparsevec, rightarg = sparsevec, commutator = <, negator = <=, join = scalargtjoinsel, restrict = scalargtsel);

alter operator >(sparsevec, sparsevec) owner to supabase_admin;

