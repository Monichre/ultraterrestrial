-- Unknown how to generate base type type

alter type sparsevec owner to supabase_admin;

create function sparsevec(sparsevec, integer, boolean) returns sparsevec
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

alter function sparsevec(sparsevec, integer, boolean) owner to supabase_admin;

grant execute on function sparsevec(sparsevec, integer, boolean) to postgres;

grant execute on function sparsevec(sparsevec, integer, boolean) to anon;

grant execute on function sparsevec(sparsevec, integer, boolean) to authenticated;

grant execute on function sparsevec(sparsevec, integer, boolean) to service_role;

