create operator + (procedure = vector_add, leftarg = vector, rightarg = vector, commutator = +);

alter operator +(vector, vector) owner to supabase_admin;

create operator + (procedure = halfvec_add, leftarg = halfvec, rightarg = halfvec, commutator = +);

alter operator +(halfvec, halfvec) owner to supabase_admin;

