create function gettransactionid() returns xid
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function gettransactionid() owner to supabase_admin;

grant execute on function gettransactionid() to postgres;

grant execute on function gettransactionid() to anon;

grant execute on function gettransactionid() to authenticated;

grant execute on function gettransactionid() to service_role;

