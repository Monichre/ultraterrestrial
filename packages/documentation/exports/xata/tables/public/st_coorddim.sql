create function st_coorddim(geometry geometry) returns smallint
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

comment on function st_coorddim(geometry) is 'args: geomA - Return the coordinate dimension of a geometry.';

alter function st_coorddim(geometry) owner to supabase_admin;

grant execute on function st_coorddim(geometry) to postgres;

grant execute on function st_coorddim(geometry) to anon;

grant execute on function st_coorddim(geometry) to authenticated;

grant execute on function st_coorddim(geometry) to service_role;

