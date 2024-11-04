create function box(geometry) returns box
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function box(geometry) owner to supabase_admin;

grant execute on function box(geometry) to postgres;

grant execute on function box(geometry) to anon;

grant execute on function box(geometry) to authenticated;

grant execute on function box(geometry) to service_role;

create function box(box3d) returns box
    immutable
    strict
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function box(box3d) owner to supabase_admin;

grant execute on function box(box3d) to postgres;

grant execute on function box(box3d) to anon;

grant execute on function box(box3d) to authenticated;

grant execute on function box(box3d) to service_role;

