create operator family sparsevec_ops using btree;

alter operator family sparsevec_ops using btree add
    operator 1 <(sparsevec, sparsevec),
    operator 2 <=(sparsevec, sparsevec),
    operator 3 =(sparsevec, sparsevec),
    operator 4 >=(sparsevec, sparsevec),
    operator 5 >(sparsevec, sparsevec),
    function 1(sparsevec, sparsevec) sparsevec_cmp(sparsevec, sparsevec);

alter operator family sparsevec_ops using btree owner to supabase_admin;

create operator class sparsevec_ops default for type sparsevec using btree as
    operator 3 =(sparsevec, sparsevec),
    operator 1 <(sparsevec, sparsevec),
    operator 2 <=(sparsevec, sparsevec),
    operator 5 >(sparsevec, sparsevec),
    operator 4 >=(sparsevec, sparsevec),
    function 1(sparsevec, sparsevec) sparsevec_cmp(sparsevec, sparsevec);

alter operator class sparsevec_ops using btree owner to supabase_admin;

