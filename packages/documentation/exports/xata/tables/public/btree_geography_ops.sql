create operator family btree_geography_ops using btree;

alter operator family btree_geography_ops using btree add
    operator 1 <(geography, geography),
    operator 2 <=(geography, geography),
    operator 3 =(geography, geography),
    operator 4 >=(geography, geography),
    operator 5 >(geography, geography),
    function 1(geography, geography) geography_cmp(geography, geography);

alter operator family btree_geography_ops using btree owner to supabase_admin;

create operator class btree_geography_ops default for type geography using btree as
    operator 1 <(geography, geography),
    operator 2 <=(geography, geography),
    operator 3 =(geography, geography),
    operator 5 >(geography, geography),
    operator 4 >=(geography, geography),
    function 1(geography, geography) geography_cmp(geography, geography);

alter operator class btree_geography_ops using btree owner to supabase_admin;

