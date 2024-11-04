create function pgis_asgeobuf_transfn(internal, anyelement) returns internal
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_asgeobuf_transfn(internal, anyelement) owner to supabase_admin;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement) to postgres;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement) to anon;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement) to authenticated;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement) to service_role;

create function pgis_asgeobuf_transfn(internal, anyelement, text) returns internal
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_asgeobuf_transfn(internal, anyelement, text) owner to supabase_admin;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement, text) to postgres;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement, text) to anon;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement, text) to authenticated;

grant execute on function pgis_asgeobuf_transfn(internal, anyelement, text) to service_role;

