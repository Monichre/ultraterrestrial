create function checkauthtrigger() returns trigger
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function checkauthtrigger() owner to supabase_admin;

grant execute on function checkauthtrigger() to postgres;

grant execute on function checkauthtrigger() to anon;

grant execute on function checkauthtrigger() to authenticated;

grant execute on function checkauthtrigger() to service_role;

