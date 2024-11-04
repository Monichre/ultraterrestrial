create function array_to_vector(integer[], integer, boolean) returns vector
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

alter function array_to_vector(integer[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_vector(integer[], integer, boolean) to postgres;

grant execute on function array_to_vector(integer[], integer, boolean) to anon;

grant execute on function array_to_vector(integer[], integer, boolean) to authenticated;

grant execute on function array_to_vector(integer[], integer, boolean) to service_role;

create function array_to_vector(real[], integer, boolean) returns vector
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

alter function array_to_vector(real[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_vector(real[], integer, boolean) to postgres;

grant execute on function array_to_vector(real[], integer, boolean) to anon;

grant execute on function array_to_vector(real[], integer, boolean) to authenticated;

grant execute on function array_to_vector(real[], integer, boolean) to service_role;

create function array_to_vector(double precision[], integer, boolean) returns vector
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

alter function array_to_vector(double precision[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_vector(double precision[], integer, boolean) to postgres;

grant execute on function array_to_vector(double precision[], integer, boolean) to anon;

grant execute on function array_to_vector(double precision[], integer, boolean) to authenticated;

grant execute on function array_to_vector(double precision[], integer, boolean) to service_role;

create function array_to_vector(numeric[], integer, boolean) returns vector
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

alter function array_to_vector(numeric[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_vector(numeric[], integer, boolean) to postgres;

grant execute on function array_to_vector(numeric[], integer, boolean) to anon;

grant execute on function array_to_vector(numeric[], integer, boolean) to authenticated;

grant execute on function array_to_vector(numeric[], integer, boolean) to service_role;

