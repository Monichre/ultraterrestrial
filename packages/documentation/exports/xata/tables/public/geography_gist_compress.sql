create function geography_gist_compress(internal) returns internal
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_gist_compress(internal) owner to supabase_admin;

grant execute on function geography_gist_compress(internal) to postgres;

grant execute on function geography_gist_compress(internal) to anon;

grant execute on function geography_gist_compress(internal) to authenticated;

grant execute on function geography_gist_compress(internal) to service_role;

