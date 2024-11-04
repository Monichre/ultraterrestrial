create function geometry_spgist_compress_3d(internal) returns internal
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

alter function geometry_spgist_compress_3d(internal) owner to supabase_admin;

grant execute on function geometry_spgist_compress_3d(internal) to postgres;

grant execute on function geometry_spgist_compress_3d(internal) to anon;

grant execute on function geometry_spgist_compress_3d(internal) to authenticated;

grant execute on function geometry_spgist_compress_3d(internal) to service_role;

