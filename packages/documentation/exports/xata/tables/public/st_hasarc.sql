create function st_hasarc(geometry geometry) returns boolean
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

comment on function st_hasarc(geometry) is 'args: geomA - Tests if a geometry contains a circular arc';

alter function st_hasarc(geometry) owner to supabase_admin;

grant execute on function st_hasarc(geometry) to postgres;

grant execute on function st_hasarc(geometry) to anon;

grant execute on function st_hasarc(geometry) to authenticated;

grant execute on function st_hasarc(geometry) to service_role;

