create function geometry_gist_union_nd(bytea, internal) returns internal
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_gist_union_nd(bytea, internal) owner to supabase_admin;

grant execute on function geometry_gist_union_nd(bytea, internal) to postgres;

grant execute on function geometry_gist_union_nd(bytea, internal) to anon;

grant execute on function geometry_gist_union_nd(bytea, internal) to authenticated;

grant execute on function geometry_gist_union_nd(bytea, internal) to service_role;

