create function pgis_asgeobuf_finalfn(internal) returns bytea
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function pgis_asgeobuf_finalfn(internal) owner to supabase_admin;

grant execute on function pgis_asgeobuf_finalfn(internal) to postgres;

grant execute on function pgis_asgeobuf_finalfn(internal) to anon;

grant execute on function pgis_asgeobuf_finalfn(internal) to authenticated;

grant execute on function pgis_asgeobuf_finalfn(internal) to service_role;

