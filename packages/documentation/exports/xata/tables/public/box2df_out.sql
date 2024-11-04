create function box2df_out(box2df) returns cstring
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

alter function box2df_out(box2df) owner to supabase_admin;

grant execute on function box2df_out(box2df) to postgres;

grant execute on function box2df_out(box2df) to anon;

grant execute on function box2df_out(box2df) to authenticated;

grant execute on function box2df_out(box2df) to service_role;

