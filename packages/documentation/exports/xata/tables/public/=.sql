create operator = (procedure = geometry_eq, leftarg = geometry, rightarg = geometry, commutator = =, join = contjoinsel, restrict = contsel, hashes, merges);

alter operator =(geometry, geometry) owner to supabase_admin;

create operator = (procedure = geography_eq, leftarg = geography, rightarg = geography, commutator = =, join = contjoinsel, restrict = contsel);

alter operator =(geography, geography) owner to supabase_admin;

create operator = (procedure = vector_eq, leftarg = vector, rightarg = vector, commutator = =, negator = <>, join = eqjoinsel, restrict = eqsel);

alter operator =(vector, vector) owner to supabase_admin;

create operator = (procedure = halfvec_eq, leftarg = halfvec, rightarg = halfvec, commutator = =, negator = <>, join = eqjoinsel, restrict = eqsel);

alter operator =(halfvec, halfvec) owner to supabase_admin;

create operator = (procedure = sparsevec_eq, leftarg = sparsevec, rightarg = sparsevec, commutator = =, negator = <>, join = eqjoinsel, restrict = eqsel);

alter operator =(sparsevec, sparsevec) owner to supabase_admin;

