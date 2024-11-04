create function st_wkbtosql(wkb bytea) returns geometry
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

alter function st_wkbtosql(bytea) owner to supabase_admin;

grant execute on function st_wkbtosql(bytea) to postgres;

grant execute on function st_wkbtosql(bytea) to anon;

grant execute on function st_wkbtosql(bytea) to authenticated;

grant execute on function st_wkbtosql(bytea) to service_role;

