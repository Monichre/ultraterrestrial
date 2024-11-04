create function hnswhandler(internal) returns index_am_handler
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function hnswhandler(internal) owner to supabase_admin;

grant execute on function hnswhandler(internal) to postgres;

grant execute on function hnswhandler(internal) to anon;

grant execute on function hnswhandler(internal) to authenticated;

grant execute on function hnswhandler(internal) to service_role;

