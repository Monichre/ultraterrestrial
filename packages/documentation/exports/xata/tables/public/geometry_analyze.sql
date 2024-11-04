create function geometry_analyze(internal) returns boolean
    strict
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geometry_analyze(internal) owner to supabase_admin;

grant execute on function geometry_analyze(internal) to postgres;

grant execute on function geometry_analyze(internal) to anon;

grant execute on function geometry_analyze(internal) to authenticated;

grant execute on function geometry_analyze(internal) to service_role;

