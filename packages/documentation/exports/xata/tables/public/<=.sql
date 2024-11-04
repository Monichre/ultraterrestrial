create operator <= (procedure = geometry_le, leftarg = geometry, rightarg = geometry, commutator = >=, negator = >, join = contjoinsel, restrict = contsel);

alter operator <=(geometry, geometry) owner to supabase_admin;

create operator <= (procedure = geography_le, leftarg = geography, rightarg = geography, commutator = >=, negator = >, join = contjoinsel, restrict = contsel);

alter operator <=(geography, geography) owner to supabase_admin;

create operator <= (procedure = vector_le, leftarg = vector, rightarg = vector, commutator = >=, negator = >, join = scalarlejoinsel, restrict = scalarlesel);

alter operator <=(vector, vector) owner to supabase_admin;

create operator <= (procedure = halfvec_le, leftarg = halfvec, rightarg = halfvec, commutator = >=, negator = >, join = scalarlejoinsel, restrict = scalarlesel);

alter operator <=(halfvec, halfvec) owner to supabase_admin;

create operator <= (procedure = sparsevec_le, leftarg = sparsevec, rightarg = sparsevec, commutator = >=, negator = >, join = scalarlejoinsel, restrict = scalarlesel);

alter operator <=(sparsevec, sparsevec) owner to supabase_admin;

