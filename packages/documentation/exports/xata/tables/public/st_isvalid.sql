create function st_isvalid(geometry, integer) returns boolean
    immutable
    strict
    parallel safe
    cost 10000
    language sql
as
$$SELECT (public.ST_isValidDetail($1, $2)).valid$$;

comment on function st_isvalid(geometry, integer) is 'args: g, flags - Tests if a geometry is well-formed in 2D.';

alter function st_isvalid(geometry, integer) owner to supabase_admin;

grant execute on function st_isvalid(geometry, integer) to postgres;

grant execute on function st_isvalid(geometry, integer) to anon;

grant execute on function st_isvalid(geometry, integer) to authenticated;

grant execute on function st_isvalid(geometry, integer) to service_role;

create function st_isvalid(geometry) returns boolean
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

comment on function st_isvalid(geometry) is 'args: g - Tests if a geometry is well-formed in 2D.';

alter function st_isvalid(geometry) owner to supabase_admin;

grant execute on function st_isvalid(geometry) to postgres;

grant execute on function st_isvalid(geometry) to anon;

grant execute on function st_isvalid(geometry) to authenticated;

grant execute on function st_isvalid(geometry) to service_role;

