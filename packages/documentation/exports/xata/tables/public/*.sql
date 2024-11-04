create operator * (procedure = vector_mul, leftarg = vector, rightarg = vector, commutator = *);

alter operator *(vector, vector) owner to supabase_admin;

create operator * (procedure = halfvec_mul, leftarg = halfvec, rightarg = halfvec, commutator = *);

alter operator *(halfvec, halfvec) owner to supabase_admin;

