create function st_reverse(geometry) returns geometry
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

comment on function st_reverse(geometry) is 'args: g1 - Return the geometry with vertex order reversed.';

alter function st_reverse(geometry) owner to supabase_admin;

grant execute on function st_reverse(geometry) to postgres;

grant execute on function st_reverse(geometry) to anon;

grant execute on function st_reverse(geometry) to authenticated;

grant execute on function st_reverse(geometry) to service_role;

