create function st_isring(geometry) returns boolean
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

comment on function st_isring(geometry) is 'args: g - Tests if a LineString is closed and simple.';

alter function st_isring(geometry) owner to supabase_admin;

grant execute on function st_isring(geometry) to postgres;

grant execute on function st_isring(geometry) to anon;

grant execute on function st_isring(geometry) to authenticated;

grant execute on function st_isring(geometry) to service_role;

