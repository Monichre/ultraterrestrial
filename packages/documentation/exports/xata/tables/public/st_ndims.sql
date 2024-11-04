create function st_ndims(geometry) returns smallint
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

comment on function st_ndims(geometry) is 'args: g1 - Returns the coordinate dimension of a geometry.';

alter function st_ndims(geometry) owner to supabase_admin;

grant execute on function st_ndims(geometry) to postgres;

grant execute on function st_ndims(geometry) to anon;

grant execute on function st_ndims(geometry) to authenticated;

grant execute on function st_ndims(geometry) to service_role;

