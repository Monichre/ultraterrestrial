create aggregate sum(vector) (
    sfunc = vector_add,
    stype = vector,
    combinefunc = vector_add,
    parallel = safe
    );

alter aggregate sum(vector) owner to supabase_admin;

grant execute on function sum(vector) to postgres;

grant execute on function sum(vector) to anon;

grant execute on function sum(vector) to authenticated;

grant execute on function sum(vector) to service_role;

create aggregate sum(halfvec) (
    sfunc = halfvec_add,
    stype = halfvec,
    combinefunc = halfvec_add,
    parallel = safe
    );

alter aggregate sum(halfvec) owner to supabase_admin;

grant execute on function sum(halfvec) to postgres;

grant execute on function sum(halfvec) to anon;

grant execute on function sum(halfvec) to authenticated;

grant execute on function sum(halfvec) to service_role;

