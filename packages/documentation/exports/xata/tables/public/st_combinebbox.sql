create function st_combinebbox(box3d, geometry) returns box3d
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_combinebbox(box3d, geometry) owner to supabase_admin;

grant execute on function st_combinebbox(box3d, geometry) to postgres;

grant execute on function st_combinebbox(box3d, geometry) to anon;

grant execute on function st_combinebbox(box3d, geometry) to authenticated;

grant execute on function st_combinebbox(box3d, geometry) to service_role;

create function st_combinebbox(box3d, box3d) returns box3d
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_combinebbox(box3d, box3d) owner to supabase_admin;

grant execute on function st_combinebbox(box3d, box3d) to postgres;

grant execute on function st_combinebbox(box3d, box3d) to anon;

grant execute on function st_combinebbox(box3d, box3d) to authenticated;

grant execute on function st_combinebbox(box3d, box3d) to service_role;

create function st_combinebbox(box2d, geometry) returns box2d
    immutable
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_combinebbox(box2d, geometry) owner to supabase_admin;

grant execute on function st_combinebbox(box2d, geometry) to postgres;

grant execute on function st_combinebbox(box2d, geometry) to anon;

grant execute on function st_combinebbox(box2d, geometry) to authenticated;

grant execute on function st_combinebbox(box2d, geometry) to service_role;

