create function gserialized_gist_joinsel_2d(internal, oid, internal, smallint) returns double precision
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function gserialized_gist_joinsel_2d(internal, oid, internal, smallint) owner to supabase_admin;

grant execute on function gserialized_gist_joinsel_2d(internal, oid, internal, smallint) to postgres;

grant execute on function gserialized_gist_joinsel_2d(internal, oid, internal, smallint) to anon;

grant execute on function gserialized_gist_joinsel_2d(internal, oid, internal, smallint) to authenticated;

grant execute on function gserialized_gist_joinsel_2d(internal, oid, internal, smallint) to service_role;

