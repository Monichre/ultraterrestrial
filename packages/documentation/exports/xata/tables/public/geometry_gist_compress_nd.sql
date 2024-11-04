create function geometry_gist_compress_nd(internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_compress_nd(internal) owner to supabase_admin;

grant execute on function geometry_gist_compress_nd(internal) to postgres;

grant execute on function geometry_gist_compress_nd(internal) to anon;

grant execute on function geometry_gist_compress_nd(internal) to authenticated;

grant execute on function geometry_gist_compress_nd(internal) to service_role;

