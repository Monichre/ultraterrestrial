create function gidx_out(gidx) returns cstring
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

alter function gidx_out(gidx) owner to supabase_admin;

grant execute on function gidx_out(gidx) to postgres;

grant execute on function gidx_out(gidx) to anon;

grant execute on function gidx_out(gidx) to authenticated;

grant execute on function gidx_out(gidx) to service_role;

