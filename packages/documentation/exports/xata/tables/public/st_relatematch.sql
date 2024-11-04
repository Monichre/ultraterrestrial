create function st_relatematch(text, text) returns boolean
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_relatematch(text, text) owner to supabase_admin;

grant execute on function st_relatematch(text, text) to postgres;

grant execute on function st_relatematch(text, text) to anon;

grant execute on function st_relatematch(text, text) to authenticated;

grant execute on function st_relatematch(text, text) to service_role;

