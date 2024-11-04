create operator family halfvec_ops using btree;

alter operator family halfvec_ops using btree add
    operator 5 >(halfvec, halfvec),
    operator 3 =(halfvec, halfvec),
    operator 2 <=(halfvec, halfvec),
    operator 4 >=(halfvec, halfvec),
    operator 1 <(halfvec, halfvec),
    function 1(halfvec, halfvec) halfvec_cmp(halfvec, halfvec);

alter operator family halfvec_ops using btree owner to supabase_admin;

create operator class halfvec_ops default for type halfvec using btree as
    operator 2 <=(halfvec, halfvec),
    operator 5 >(halfvec, halfvec),
    operator 4 >=(halfvec, halfvec),
    operator 3 =(halfvec, halfvec),
    operator 1 <(halfvec, halfvec),
    function 1(halfvec, halfvec) halfvec_cmp(halfvec, halfvec);

alter operator class halfvec_ops using btree owner to supabase_admin;

