create aggregate avg(vector) (
    sfunc = vector_accum,
    stype = double precision[],
    finalfunc = vector_avg,
    combinefunc = vector_combine,
    initcond = '{0}',
    parallel = safe
    );

alter aggregate avg(vector) owner to supabase_admin;

grant execute on function avg(vector) to postgres;

grant execute on function avg(vector) to anon;

grant execute on function avg(vector) to authenticated;

grant execute on function avg(vector) to service_role;

create aggregate avg(halfvec) (
    sfunc = halfvec_accum,
    stype = double precision[],
    finalfunc = halfvec_avg,
    combinefunc = halfvec_combine,
    initcond = '{0}',
    parallel = safe
    );

alter aggregate avg(halfvec) owner to supabase_admin;

grant execute on function avg(halfvec) to postgres;

grant execute on function avg(halfvec) to anon;

grant execute on function avg(halfvec) to authenticated;

grant execute on function avg(halfvec) to service_role;

