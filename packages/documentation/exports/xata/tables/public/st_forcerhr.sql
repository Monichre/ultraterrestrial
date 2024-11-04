create function st_forcerhr(geometry) returns geometry
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

comment on function st_forcerhr(geometry) is 'args: g - Force the orientation of the vertices in a polygon to follow the Right-Hand-Rule.';

alter function st_forcerhr(geometry) owner to supabase_admin;

grant execute on function st_forcerhr(geometry) to postgres;

grant execute on function st_forcerhr(geometry) to anon;

grant execute on function st_forcerhr(geometry) to authenticated;

grant execute on function st_forcerhr(geometry) to service_role;

