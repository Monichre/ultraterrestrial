create function st_cleangeometry(geometry) returns geometry
    immutable
    strict
    parallel safe
    cost 10000
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_cleangeometry(geometry) owner to supabase_admin;

grant execute on function st_cleangeometry(geometry) to postgres;

grant execute on function st_cleangeometry(geometry) to anon;

grant execute on function st_cleangeometry(geometry) to authenticated;

grant execute on function st_cleangeometry(geometry) to service_role;

