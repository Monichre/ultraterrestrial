create function st_linefrommultipoint(geometry) returns geometry
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

comment on function st_linefrommultipoint(geometry) is 'args: aMultiPoint - Creates a LineString from a MultiPoint geometry.';

alter function st_linefrommultipoint(geometry) owner to supabase_admin;

grant execute on function st_linefrommultipoint(geometry) to postgres;

grant execute on function st_linefrommultipoint(geometry) to anon;

grant execute on function st_linefrommultipoint(geometry) to authenticated;

grant execute on function st_linefrommultipoint(geometry) to service_role;

