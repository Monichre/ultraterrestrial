create function st_fromflatgeobuftotable(text, text, bytea) returns void
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

alter function st_fromflatgeobuftotable(text, text, bytea) owner to supabase_admin;

grant execute on function st_fromflatgeobuftotable(text, text, bytea) to postgres;

grant execute on function st_fromflatgeobuftotable(text, text, bytea) to anon;

grant execute on function st_fromflatgeobuftotable(text, text, bytea) to authenticated;

grant execute on function st_fromflatgeobuftotable(text, text, bytea) to service_role;

