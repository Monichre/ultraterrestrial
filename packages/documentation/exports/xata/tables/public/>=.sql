create operator >= (procedure = geometry_ge, leftarg = geometry, rightarg = geometry, commutator = <=, negator = <, join = contjoinsel, restrict = contsel);

alter operator >=(geometry, geometry) owner to supabase_admin;

create operator >= (procedure = geography_ge, leftarg = geography, rightarg = geography, commutator = <=, negator = <, join = contjoinsel, restrict = contsel);

alter operator >=(geography, geography) owner to supabase_admin;

create operator >= (procedure = vector_ge, leftarg = vector, rightarg = vector, commutator = <=, negator = <, join = scalargejoinsel, restrict = scalargesel);

alter operator >=(vector, vector) owner to supabase_admin;

create operator >= (procedure = halfvec_ge, leftarg = halfvec, rightarg = halfvec, commutator = <=, negator = <, join = scalargejoinsel, restrict = scalargesel);

alter operator >=(halfvec, halfvec) owner to supabase_admin;

create operator >= (procedure = sparsevec_ge, leftarg = sparsevec, rightarg = sparsevec, commutator = <=, negator = <, join = scalargejoinsel, restrict = scalargesel);

alter operator >=(sparsevec, sparsevec) owner to supabase_admin;

