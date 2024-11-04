create function pgis_asmvt_serialfn(internal) returns bytea
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

alter function pgis_asmvt_serialfn(internal) owner to supabase_admin;

grant execute on function pgis_asmvt_serialfn(internal) to postgres;

grant execute on function pgis_asmvt_serialfn(internal) to anon;

grant execute on function pgis_asmvt_serialfn(internal) to authenticated;

grant execute on function pgis_asmvt_serialfn(internal) to service_role;

