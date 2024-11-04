create function pgis_asmvt_combinefn(internal, internal) returns internal
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

alter function pgis_asmvt_combinefn(internal, internal) owner to supabase_admin;

grant execute on function pgis_asmvt_combinefn(internal, internal) to postgres;

grant execute on function pgis_asmvt_combinefn(internal, internal) to anon;

grant execute on function pgis_asmvt_combinefn(internal, internal) to authenticated;

grant execute on function pgis_asmvt_combinefn(internal, internal) to service_role;

