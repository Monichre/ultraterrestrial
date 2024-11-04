create function box3d_out(box3d) returns cstring
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

alter function box3d_out(box3d) owner to supabase_admin;

grant execute on function box3d_out(box3d) to postgres;

grant execute on function box3d_out(box3d) to anon;

grant execute on function box3d_out(box3d) to authenticated;

grant execute on function box3d_out(box3d) to service_role;

