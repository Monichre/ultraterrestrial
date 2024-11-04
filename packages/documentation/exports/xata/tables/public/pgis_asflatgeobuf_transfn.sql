create function pgis_asflatgeobuf_transfn(internal, anyelement) returns internal
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

alter function pgis_asflatgeobuf_transfn(internal, anyelement) owner to supabase_admin;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement) to postgres;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement) to anon;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement) to authenticated;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement) to service_role;

create function pgis_asflatgeobuf_transfn(internal, anyelement, boolean) returns internal
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

alter function pgis_asflatgeobuf_transfn(internal, anyelement, boolean) owner to supabase_admin;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean) to postgres;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean) to anon;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean) to authenticated;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean) to service_role;

create function pgis_asflatgeobuf_transfn(internal, anyelement, boolean, text) returns internal
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

alter function pgis_asflatgeobuf_transfn(internal, anyelement, boolean, text) owner to supabase_admin;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean, text) to postgres;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean, text) to anon;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean, text) to authenticated;

grant execute on function pgis_asflatgeobuf_transfn(internal, anyelement, boolean, text) to service_role;

