create function geography_ge(geography, geography) returns boolean
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

alter function geography_ge(geography, geography) owner to supabase_admin;

grant execute on function geography_ge(geography, geography) to postgres;

grant execute on function geography_ge(geography, geography) to anon;

grant execute on function geography_ge(geography, geography) to authenticated;

grant execute on function geography_ge(geography, geography) to service_role;

