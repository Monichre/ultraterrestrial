create function box2df_in(cstring) returns box2df
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

alter function box2df_in(cstring) owner to supabase_admin;

grant execute on function box2df_in(cstring) to postgres;

grant execute on function box2df_in(cstring) to anon;

grant execute on function box2df_in(cstring) to authenticated;

grant execute on function box2df_in(cstring) to service_role;

