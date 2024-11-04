create function st_collectionhomogenize(geometry) returns geometry
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

comment on function st_collectionhomogenize(geometry) is 'args: collection - Returns the simplest representation of a geometry collection.';

alter function st_collectionhomogenize(geometry) owner to supabase_admin;

grant execute on function st_collectionhomogenize(geometry) to postgres;

grant execute on function st_collectionhomogenize(geometry) to anon;

grant execute on function st_collectionhomogenize(geometry) to authenticated;

grant execute on function st_collectionhomogenize(geometry) to service_role;

