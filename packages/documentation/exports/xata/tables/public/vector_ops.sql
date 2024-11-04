create operator family vector_ops using btree;

alter operator family vector_ops using btree add
    operator 2 <=(vector, vector),
    operator 4 >=(vector, vector),
    operator 1 <(vector, vector),
    operator 3 =(vector, vector),
    operator 5 >(vector, vector),
    function 1(vector, vector) vector_cmp(vector, vector);

alter operator family vector_ops using btree owner to supabase_admin;

create operator class vector_ops default for type vector using btree as
    operator 5 >(vector, vector),
    operator 3 =(vector, vector),
    operator 1 <(vector, vector),
    operator 2 <=(vector, vector),
    operator 4 >=(vector, vector),
    function 1(vector, vector) vector_cmp(vector, vector);

alter operator class vector_ops using btree owner to supabase_admin;

