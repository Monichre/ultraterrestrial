create function box2d_out(box2d) returns cstring
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

alter function box2d_out(box2d) owner to supabase_admin;

grant execute on function box2d_out(box2d) to postgres;

grant execute on function box2d_out(box2d) to anon;

grant execute on function box2d_out(box2d) to authenticated;

grant execute on function box2d_out(box2d) to service_role;

