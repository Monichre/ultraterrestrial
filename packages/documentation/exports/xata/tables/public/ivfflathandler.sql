create function ivfflathandler(internal) returns index_am_handler
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function ivfflathandler(internal) owner to supabase_admin;

grant execute on function ivfflathandler(internal) to postgres;

grant execute on function ivfflathandler(internal) to anon;

grant execute on function ivfflathandler(internal) to authenticated;

grant execute on function ivfflathandler(internal) to service_role;

