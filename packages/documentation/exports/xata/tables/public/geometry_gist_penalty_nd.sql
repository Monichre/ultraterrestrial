create function geometry_gist_penalty_nd(internal, internal, internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_penalty_nd(internal, internal, internal) owner to supabase_admin;

grant execute on function geometry_gist_penalty_nd(internal, internal, internal) to postgres;

grant execute on function geometry_gist_penalty_nd(internal, internal, internal) to anon;

grant execute on function geometry_gist_penalty_nd(internal, internal, internal) to authenticated;

grant execute on function geometry_gist_penalty_nd(internal, internal, internal) to service_role;

