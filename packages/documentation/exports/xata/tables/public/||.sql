create operator || (procedure = vector_concat, leftarg = vector, rightarg = vector);

alter operator ||(vector, vector) owner to supabase_admin;

create operator || (procedure = halfvec_concat, leftarg = halfvec, rightarg = halfvec);

alter operator ||(halfvec, halfvec) owner to supabase_admin;

