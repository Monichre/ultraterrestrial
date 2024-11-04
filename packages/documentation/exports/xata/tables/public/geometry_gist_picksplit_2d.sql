create function geometry_gist_picksplit_2d(internal, internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_picksplit_2d(internal, internal) owner to supabase_admin;

grant execute on function geometry_gist_picksplit_2d(internal, internal) to postgres;

grant execute on function geometry_gist_picksplit_2d(internal, internal) to anon;

grant execute on function geometry_gist_picksplit_2d(internal, internal) to authenticated;

grant execute on function geometry_gist_picksplit_2d(internal, internal) to service_role;

