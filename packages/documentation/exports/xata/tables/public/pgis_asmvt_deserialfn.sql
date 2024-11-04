create function pgis_asmvt_deserialfn(bytea, internal) returns internal
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

alter function pgis_asmvt_deserialfn(bytea, internal) owner to supabase_admin;

grant execute on function pgis_asmvt_deserialfn(bytea, internal) to postgres;

grant execute on function pgis_asmvt_deserialfn(bytea, internal) to anon;

grant execute on function pgis_asmvt_deserialfn(bytea, internal) to authenticated;

grant execute on function pgis_asmvt_deserialfn(bytea, internal) to service_role;

