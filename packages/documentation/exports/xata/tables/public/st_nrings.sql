create function st_nrings(geometry) returns integer
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

comment on function st_nrings(geometry) is 'args: geomA - Returns the number of rings in a polygonal geometry.';

alter function st_nrings(geometry) owner to supabase_admin;

grant execute on function st_nrings(geometry) to postgres;

grant execute on function st_nrings(geometry) to anon;

grant execute on function st_nrings(geometry) to authenticated;

grant execute on function st_nrings(geometry) to service_role;

