create function st_isvaliddetail(geom geometry, flags integer default 0) returns valid_detail
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

comment on function st_isvaliddetail(geometry, integer) is 'args: geom, flags - Returns a valid_detail row stating if a geometry is valid or if not a reason and a location.';

alter function st_isvaliddetail(geometry, integer) owner to supabase_admin;

grant execute on function st_isvaliddetail(geometry, integer) to postgres;

grant execute on function st_isvaliddetail(geometry, integer) to anon;

grant execute on function st_isvaliddetail(geometry, integer) to authenticated;

grant execute on function st_isvaliddetail(geometry, integer) to service_role;

