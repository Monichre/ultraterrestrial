create function st_numgeometries(geometry) returns integer
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

comment on function st_numgeometries(geometry) is 'args: geom - Returns the number of elements in a geometry collection.';

alter function st_numgeometries(geometry) owner to supabase_admin;

grant execute on function st_numgeometries(geometry) to postgres;

grant execute on function st_numgeometries(geometry) to anon;

grant execute on function st_numgeometries(geometry) to authenticated;

grant execute on function st_numgeometries(geometry) to service_role;

