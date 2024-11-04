create function box3dtobox(box3d) returns box
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

alter function box3dtobox(box3d) owner to supabase_admin;

grant execute on function box3dtobox(box3d) to postgres;

grant execute on function box3dtobox(box3d) to anon;

grant execute on function box3dtobox(box3d) to authenticated;

grant execute on function box3dtobox(box3d) to service_role;

