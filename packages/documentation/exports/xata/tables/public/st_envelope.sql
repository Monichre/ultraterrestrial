create function st_envelope(geometry) returns geometry
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

comment on function st_envelope(geometry) is 'args: g1 - Returns a geometry representing the bounding box of a geometry.';

alter function st_envelope(geometry) owner to supabase_admin;

grant execute on function st_envelope(geometry) to postgres;

grant execute on function st_envelope(geometry) to anon;

grant execute on function st_envelope(geometry) to authenticated;

grant execute on function st_envelope(geometry) to service_role;

