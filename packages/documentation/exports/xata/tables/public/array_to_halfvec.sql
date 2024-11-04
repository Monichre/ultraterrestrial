create function array_to_halfvec(integer[], integer, boolean) returns halfvec
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

alter function array_to_halfvec(integer[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_halfvec(integer[], integer, boolean) to postgres;

grant execute on function array_to_halfvec(integer[], integer, boolean) to anon;

grant execute on function array_to_halfvec(integer[], integer, boolean) to authenticated;

grant execute on function array_to_halfvec(integer[], integer, boolean) to service_role;

create function array_to_halfvec(real[], integer, boolean) returns halfvec
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

alter function array_to_halfvec(real[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_halfvec(real[], integer, boolean) to postgres;

grant execute on function array_to_halfvec(real[], integer, boolean) to anon;

grant execute on function array_to_halfvec(real[], integer, boolean) to authenticated;

grant execute on function array_to_halfvec(real[], integer, boolean) to service_role;

create function array_to_halfvec(double precision[], integer, boolean) returns halfvec
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

alter function array_to_halfvec(double precision[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_halfvec(double precision[], integer, boolean) to postgres;

grant execute on function array_to_halfvec(double precision[], integer, boolean) to anon;

grant execute on function array_to_halfvec(double precision[], integer, boolean) to authenticated;

grant execute on function array_to_halfvec(double precision[], integer, boolean) to service_role;

create function array_to_halfvec(numeric[], integer, boolean) returns halfvec
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

alter function array_to_halfvec(numeric[], integer, boolean) owner to supabase_admin;

grant execute on function array_to_halfvec(numeric[], integer, boolean) to postgres;

grant execute on function array_to_halfvec(numeric[], integer, boolean) to anon;

grant execute on function array_to_halfvec(numeric[], integer, boolean) to authenticated;

grant execute on function array_to_halfvec(numeric[], integer, boolean) to service_role;

