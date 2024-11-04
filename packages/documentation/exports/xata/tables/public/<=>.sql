create operator <=> (procedure = cosine_distance, leftarg = vector, rightarg = vector, commutator = <=>);

alter operator <=>(vector, vector) owner to supabase_admin;

create operator <=> (procedure = cosine_distance, leftarg = halfvec, rightarg = halfvec, commutator = <=>);

alter operator <=>(halfvec, halfvec) owner to supabase_admin;

create operator <=> (procedure = cosine_distance, leftarg = sparsevec, rightarg = sparsevec, commutator = <=>);

alter operator <=>(sparsevec, sparsevec) owner to supabase_admin;

