create function geography_gist_union(bytea, internal) returns internal
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_gist_union(bytea, internal) owner to supabase_admin;

grant execute on function geography_gist_union(bytea, internal) to postgres;

grant execute on function geography_gist_union(bytea, internal) to anon;

grant execute on function geography_gist_union(bytea, internal) to authenticated;

grant execute on function geography_gist_union(bytea, internal) to service_role;

