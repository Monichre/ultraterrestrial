create function geography_gist_penalty(internal, internal, internal) returns internal
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_gist_penalty(internal, internal, internal) owner to supabase_admin;

grant execute on function geography_gist_penalty(internal, internal, internal) to postgres;

grant execute on function geography_gist_penalty(internal, internal, internal) to anon;

grant execute on function geography_gist_penalty(internal, internal, internal) to authenticated;

grant execute on function geography_gist_penalty(internal, internal, internal) to service_role;

