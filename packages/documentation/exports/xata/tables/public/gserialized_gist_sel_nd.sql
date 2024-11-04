create function gserialized_gist_sel_nd(internal, oid, internal, integer) returns double precision
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function gserialized_gist_sel_nd(internal, oid, internal, integer) owner to supabase_admin;

grant execute on function gserialized_gist_sel_nd(internal, oid, internal, integer) to postgres;

grant execute on function gserialized_gist_sel_nd(internal, oid, internal, integer) to anon;

grant execute on function gserialized_gist_sel_nd(internal, oid, internal, integer) to authenticated;

grant execute on function gserialized_gist_sel_nd(internal, oid, internal, integer) to service_role;

