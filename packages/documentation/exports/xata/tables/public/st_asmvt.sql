create aggregate st_asmvt(anyelement) (
    sfunc = pgis_asmvt_transfn,
    stype = internal,
    finalfunc = pgis_asmvt_finalfn,
    combinefunc = pgis_asmvt_combinefn,
    serialfunc = pgis_asmvt_serialfn,
    deserialfunc = pgis_asmvt_deserialfn,
    parallel = safe
    );

alter aggregate st_asmvt(anyelement) owner to supabase_admin;

grant execute on function st_asmvt(anyelement) to postgres;

grant execute on function st_asmvt(anyelement) to anon;

grant execute on function st_asmvt(anyelement) to authenticated;

grant execute on function st_asmvt(anyelement) to service_role;

create aggregate st_asmvt(anyelement, text) (
    sfunc = pgis_asmvt_transfn,
    stype = internal,
    finalfunc = pgis_asmvt_finalfn,
    combinefunc = pgis_asmvt_combinefn,
    serialfunc = pgis_asmvt_serialfn,
    deserialfunc = pgis_asmvt_deserialfn,
    parallel = safe
    );

alter aggregate st_asmvt(anyelement, text) owner to supabase_admin;

grant execute on function st_asmvt(anyelement, text) to postgres;

grant execute on function st_asmvt(anyelement, text) to anon;

grant execute on function st_asmvt(anyelement, text) to authenticated;

grant execute on function st_asmvt(anyelement, text) to service_role;

create aggregate st_asmvt(anyelement, text, integer) (
    sfunc = pgis_asmvt_transfn,
    stype = internal,
    finalfunc = pgis_asmvt_finalfn,
    combinefunc = pgis_asmvt_combinefn,
    serialfunc = pgis_asmvt_serialfn,
    deserialfunc = pgis_asmvt_deserialfn,
    parallel = safe
    );

alter aggregate st_asmvt(anyelement, text, integer) owner to supabase_admin;

grant execute on function st_asmvt(anyelement, text, integer) to postgres;

grant execute on function st_asmvt(anyelement, text, integer) to anon;

grant execute on function st_asmvt(anyelement, text, integer) to authenticated;

grant execute on function st_asmvt(anyelement, text, integer) to service_role;

create aggregate st_asmvt(anyelement, text, integer, text) (
    sfunc = pgis_asmvt_transfn,
    stype = internal,
    finalfunc = pgis_asmvt_finalfn,
    combinefunc = pgis_asmvt_combinefn,
    serialfunc = pgis_asmvt_serialfn,
    deserialfunc = pgis_asmvt_deserialfn,
    parallel = safe
    );

alter aggregate st_asmvt(anyelement, text, integer, text) owner to supabase_admin;

grant execute on function st_asmvt(anyelement, text, integer, text) to postgres;

grant execute on function st_asmvt(anyelement, text, integer, text) to anon;

grant execute on function st_asmvt(anyelement, text, integer, text) to authenticated;

grant execute on function st_asmvt(anyelement, text, integer, text) to service_role;

create aggregate st_asmvt(anyelement, text, integer, text, text) (
    sfunc = pgis_asmvt_transfn,
    stype = internal,
    finalfunc = pgis_asmvt_finalfn,
    combinefunc = pgis_asmvt_combinefn,
    serialfunc = pgis_asmvt_serialfn,
    deserialfunc = pgis_asmvt_deserialfn,
    parallel = safe
    );

alter aggregate st_asmvt(anyelement, text, integer, text, text) owner to supabase_admin;

grant execute on function st_asmvt(anyelement, text, integer, text, text) to postgres;

grant execute on function st_asmvt(anyelement, text, integer, text, text) to anon;

grant execute on function st_asmvt(anyelement, text, integer, text, text) to authenticated;

grant execute on function st_asmvt(anyelement, text, integer, text, text) to service_role;

