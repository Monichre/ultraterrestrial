-- Unknown how to generate base type type

alter type vector owner to supabase_admin;

create function vector(vector, integer, boolean) returns vector
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

alter function vector(vector, integer, boolean) owner to supabase_admin;

grant execute on function vector(vector, integer, boolean) to postgres;

grant execute on function vector(vector, integer, boolean) to anon;

grant execute on function vector(vector, integer, boolean) to authenticated;

grant execute on function vector(vector, integer, boolean) to service_role;

