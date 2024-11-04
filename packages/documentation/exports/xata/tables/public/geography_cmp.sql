create function geography_cmp(geography, geography) returns integer
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

alter function geography_cmp(geography, geography) owner to supabase_admin;

grant execute on function geography_cmp(geography, geography) to postgres;

grant execute on function geography_cmp(geography, geography) to anon;

grant execute on function geography_cmp(geography, geography) to authenticated;

grant execute on function geography_cmp(geography, geography) to service_role;

