create function st_node(g geometry) returns geometry
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

comment on function st_node(geometry) is 'args: geom - Nodes a collection of lines.';

alter function st_node(geometry) owner to supabase_admin;

grant execute on function st_node(geometry) to postgres;

grant execute on function st_node(geometry) to anon;

grant execute on function st_node(geometry) to authenticated;

grant execute on function st_node(geometry) to service_role;

