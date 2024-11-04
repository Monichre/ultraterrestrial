create function geography_spgist_compress_nd(internal) returns internal
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_spgist_compress_nd(internal) owner to supabase_admin;

grant execute on function geography_spgist_compress_nd(internal) to postgres;

grant execute on function geography_spgist_compress_nd(internal) to anon;

grant execute on function geography_spgist_compress_nd(internal) to authenticated;

grant execute on function geography_spgist_compress_nd(internal) to service_role;

