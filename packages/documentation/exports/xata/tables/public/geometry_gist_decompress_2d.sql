create function geometry_gist_decompress_2d(internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_decompress_2d(internal) owner to supabase_admin;

grant execute on function geometry_gist_decompress_2d(internal) to postgres;

grant execute on function geometry_gist_decompress_2d(internal) to anon;

grant execute on function geometry_gist_decompress_2d(internal) to authenticated;

grant execute on function geometry_gist_decompress_2d(internal) to service_role;

