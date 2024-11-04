create function geography_send(geography) returns bytea
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

alter function geography_send(geography) owner to supabase_admin;

grant execute on function geography_send(geography) to postgres;

grant execute on function geography_send(geography) to anon;

grant execute on function geography_send(geography) to authenticated;

grant execute on function geography_send(geography) to service_role;

