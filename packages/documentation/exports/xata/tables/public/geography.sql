-- Unknown how to generate base type type

comment on type geography is 'postgis type: The type representing spatial features with geodetic (ellipsoidal) coordinate systems.';

alter type geography owner to supabase_admin;

create function geography(geography, integer, boolean) returns geography
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

alter function geography(geography, integer, boolean) owner to supabase_admin;

grant execute on function geography(geography, integer, boolean) to postgres;

grant execute on function geography(geography, integer, boolean) to anon;

grant execute on function geography(geography, integer, boolean) to authenticated;

grant execute on function geography(geography, integer, boolean) to service_role;

create function geography(bytea) returns geography
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

alter function geography(bytea) owner to supabase_admin;

grant execute on function geography(bytea) to postgres;

grant execute on function geography(bytea) to anon;

grant execute on function geography(bytea) to authenticated;

grant execute on function geography(bytea) to service_role;

create function geography(geometry) returns geography
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

alter function geography(geometry) owner to supabase_admin;

grant execute on function geography(geometry) to postgres;

grant execute on function geography(geometry) to anon;

grant execute on function geography(geometry) to authenticated;

grant execute on function geography(geometry) to service_role;

