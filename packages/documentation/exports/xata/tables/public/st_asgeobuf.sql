create aggregate st_asgeobuf(anyelement) (
    sfunc = pgis_asgeobuf_transfn,
    stype = internal,
    finalfunc = pgis_asgeobuf_finalfn,
    parallel = safe
    );

alter aggregate st_asgeobuf(anyelement) owner to supabase_admin;

grant execute on function st_asgeobuf(anyelement) to postgres;

grant execute on function st_asgeobuf(anyelement) to anon;

grant execute on function st_asgeobuf(anyelement) to authenticated;

grant execute on function st_asgeobuf(anyelement) to service_role;

create aggregate st_asgeobuf(anyelement, text) (
    sfunc = pgis_asgeobuf_transfn,
    stype = internal,
    finalfunc = pgis_asgeobuf_finalfn,
    parallel = safe
    );

alter aggregate st_asgeobuf(anyelement, text) owner to supabase_admin;

grant execute on function st_asgeobuf(anyelement, text) to postgres;

grant execute on function st_asgeobuf(anyelement, text) to anon;

grant execute on function st_asgeobuf(anyelement, text) to authenticated;

grant execute on function st_asgeobuf(anyelement, text) to service_role;

