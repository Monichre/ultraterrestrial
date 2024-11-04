create aggregate st_asflatgeobuf(anyelement) (
    sfunc = pgis_asflatgeobuf_transfn,
    stype = internal,
    finalfunc = pgis_asflatgeobuf_finalfn,
    parallel = safe
    );

alter aggregate st_asflatgeobuf(anyelement) owner to supabase_admin;

grant execute on function st_asflatgeobuf(anyelement) to postgres;

grant execute on function st_asflatgeobuf(anyelement) to anon;

grant execute on function st_asflatgeobuf(anyelement) to authenticated;

grant execute on function st_asflatgeobuf(anyelement) to service_role;

create aggregate st_asflatgeobuf(anyelement, boolean) (
    sfunc = pgis_asflatgeobuf_transfn,
    stype = internal,
    finalfunc = pgis_asflatgeobuf_finalfn,
    parallel = safe
    );

alter aggregate st_asflatgeobuf(anyelement, boolean) owner to supabase_admin;

grant execute on function st_asflatgeobuf(anyelement, boolean) to postgres;

grant execute on function st_asflatgeobuf(anyelement, boolean) to anon;

grant execute on function st_asflatgeobuf(anyelement, boolean) to authenticated;

grant execute on function st_asflatgeobuf(anyelement, boolean) to service_role;

create aggregate st_asflatgeobuf(anyelement, boolean, text) (
    sfunc = pgis_asflatgeobuf_transfn,
    stype = internal,
    finalfunc = pgis_asflatgeobuf_finalfn,
    parallel = safe
    );

alter aggregate st_asflatgeobuf(anyelement, boolean, text) owner to supabase_admin;

grant execute on function st_asflatgeobuf(anyelement, boolean, text) to postgres;

grant execute on function st_asflatgeobuf(anyelement, boolean, text) to anon;

grant execute on function st_asflatgeobuf(anyelement, boolean, text) to authenticated;

grant execute on function st_asflatgeobuf(anyelement, boolean, text) to service_role;

