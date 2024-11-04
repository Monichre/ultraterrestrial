create operator < (procedure = geometry_lt, leftarg = geometry, rightarg = geometry, commutator = >, negator = >=, join = contjoinsel, restrict = contsel);

alter operator <(geometry, geometry) owner to supabase_admin;

create operator < (procedure = geography_lt, leftarg = geography, rightarg = geography, commutator = >, negator = >=, join = contjoinsel, restrict = contsel);

alter operator <(geography, geography) owner to supabase_admin;

create operator < (procedure = vector_lt, leftarg = vector, rightarg = vector, commutator = >, negator = >=, join = scalarltjoinsel, restrict = scalarltsel);

alter operator <(vector, vector) owner to supabase_admin;

create operator < (procedure = halfvec_lt, leftarg = halfvec, rightarg = halfvec, commutator = >, negator = >=, join = scalarltjoinsel, restrict = scalarltsel);

alter operator <(halfvec, halfvec) owner to supabase_admin;

create operator < (procedure = sparsevec_lt, leftarg = sparsevec, rightarg = sparsevec, commutator = >, negator = >=, join = scalarltjoinsel, restrict = scalarltsel);

alter operator <(sparsevec, sparsevec) owner to supabase_admin;

