create function st_issimple(geometry) returns boolean
    immutable
    strict
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_issimple(geometry) is 'args: geomA - Tests if a geometry has no points of self-intersection or self-tangency.';

alter function st_issimple(geometry) owner to supabase_admin;

grant execute on function st_issimple(geometry) to postgres;

grant execute on function st_issimple(geometry) to anon;

grant execute on function st_issimple(geometry) to authenticated;

grant execute on function st_issimple(geometry) to service_role;

