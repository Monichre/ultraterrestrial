create operator <> (procedure = vector_ne, leftarg = vector, rightarg = vector, commutator = <>, negator = =, join = eqjoinsel, restrict = eqsel);

alter operator <>(vector, vector) owner to supabase_admin;

create operator <> (procedure = halfvec_ne, leftarg = halfvec, rightarg = halfvec, commutator = <>, negator = =, join = eqjoinsel, restrict = eqsel);

alter operator <>(halfvec, halfvec) owner to supabase_admin;

create operator <> (procedure = sparsevec_ne, leftarg = sparsevec, rightarg = sparsevec, commutator = <>, negator = =, join = eqjoinsel, restrict = eqsel);

alter operator <>(sparsevec, sparsevec) owner to supabase_admin;

