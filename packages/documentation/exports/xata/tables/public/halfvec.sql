-- Unknown how to generate base type type

alter type halfvec owner to supabase_admin;

create function halfvec(halfvec, integer, boolean) returns halfvec
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

alter function halfvec(halfvec, integer, boolean) owner to supabase_admin;

grant execute on function halfvec(halfvec, integer, boolean) to postgres;

grant execute on function halfvec(halfvec, integer, boolean) to anon;

grant execute on function halfvec(halfvec, integer, boolean) to authenticated;

grant execute on function halfvec(halfvec, integer, boolean) to service_role;

