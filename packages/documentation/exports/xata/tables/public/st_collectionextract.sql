create function st_collectionextract(geometry, integer) returns geometry
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

comment on function st_collectionextract(geometry, integer) is 'args: collection, type - Given a geometry collection, returns a multi-geometry containing only elements of a specified type.';

alter function st_collectionextract(geometry, integer) owner to supabase_admin;

grant execute on function st_collectionextract(geometry, integer) to postgres;

grant execute on function st_collectionextract(geometry, integer) to anon;

grant execute on function st_collectionextract(geometry, integer) to authenticated;

grant execute on function st_collectionextract(geometry, integer) to service_role;

create function st_collectionextract(geometry) returns geometry
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

comment on function st_collectionextract(geometry) is 'args: collection - Given a geometry collection, returns a multi-geometry containing only elements of a specified type.';

alter function st_collectionextract(geometry) owner to supabase_admin;

grant execute on function st_collectionextract(geometry) to postgres;

grant execute on function st_collectionextract(geometry) to anon;

grant execute on function st_collectionextract(geometry) to authenticated;

grant execute on function st_collectionextract(geometry) to service_role;

