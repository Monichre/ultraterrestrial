create function geometry_gist_picksplit_nd(internal, internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_picksplit_nd(internal, internal) owner to supabase_admin;

grant execute on function geometry_gist_picksplit_nd(internal, internal) to postgres;

grant execute on function geometry_gist_picksplit_nd(internal, internal) to anon;

grant execute on function geometry_gist_picksplit_nd(internal, internal) to authenticated;

grant execute on function geometry_gist_picksplit_nd(internal, internal) to service_role;

