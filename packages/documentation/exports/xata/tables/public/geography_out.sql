create function geography_out(geography) returns cstring
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

alter function geography_out(geography) owner to supabase_admin;

grant execute on function geography_out(geography) to postgres;

grant execute on function geography_out(geography) to anon;

grant execute on function geography_out(geography) to authenticated;

grant execute on function geography_out(geography) to service_role;

