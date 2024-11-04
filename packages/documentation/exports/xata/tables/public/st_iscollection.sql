create function st_iscollection(geometry) returns boolean
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

comment on function st_iscollection(geometry) is 'args: g - Tests if a geometry is a geometry collection type.';

alter function st_iscollection(geometry) owner to supabase_admin;

grant execute on function st_iscollection(geometry) to postgres;

grant execute on function st_iscollection(geometry) to anon;

grant execute on function st_iscollection(geometry) to authenticated;

grant execute on function st_iscollection(geometry) to service_role;

