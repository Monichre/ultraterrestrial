create function geometry_gist_union_2d(bytea, internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_union_2d(bytea, internal) owner to supabase_admin;

grant execute on function geometry_gist_union_2d(bytea, internal) to postgres;

grant execute on function geometry_gist_union_2d(bytea, internal) to anon;

grant execute on function geometry_gist_union_2d(bytea, internal) to authenticated;

grant execute on function geometry_gist_union_2d(bytea, internal) to service_role;

