create function geometry_sortsupport(internal) returns void
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_sortsupport(internal) owner to supabase_admin;

grant execute on function geometry_sortsupport(internal) to postgres;

grant execute on function geometry_sortsupport(internal) to anon;

grant execute on function geometry_sortsupport(internal) to authenticated;

grant execute on function geometry_sortsupport(internal) to service_role;

