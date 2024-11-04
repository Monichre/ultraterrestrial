create function st_zmflag(geometry) returns smallint
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

comment on function st_zmflag(geometry) is 'args: geomA - Returns a code indicating the ZM coordinate dimension of a geometry.';

alter function st_zmflag(geometry) owner to supabase_admin;

grant execute on function st_zmflag(geometry) to postgres;

grant execute on function st_zmflag(geometry) to anon;

grant execute on function st_zmflag(geometry) to authenticated;

grant execute on function st_zmflag(geometry) to service_role;

