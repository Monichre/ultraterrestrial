create function st_wkttosql(text) returns geometry
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

alter function st_wkttosql(text) owner to supabase_admin;

grant execute on function st_wkttosql(text) to postgres;

grant execute on function st_wkttosql(text) to anon;

grant execute on function st_wkttosql(text) to authenticated;

grant execute on function st_wkttosql(text) to service_role;

