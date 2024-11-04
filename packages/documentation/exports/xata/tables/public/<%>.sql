create operator <%> (procedure = jaccard_distance, leftarg = bit, rightarg = bit, commutator = <%>);

alter operator <%>(bit, bit) owner to supabase_admin;

