create function geography_gist_decompress(internal) returns internal
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_gist_decompress(internal) owner to supabase_admin;

grant execute on function geography_gist_decompress(internal) to postgres;

grant execute on function geography_gist_decompress(internal) to anon;

grant execute on function geography_gist_decompress(internal) to authenticated;

grant execute on function geography_gist_decompress(internal) to service_role;

