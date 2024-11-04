create function st_pointfromgeohash(text, integer default NULL::integer) returns geometry
    immutable
    parallel safe
    cost 50
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function st_pointfromgeohash(text, integer) owner to supabase_admin;

grant execute on function st_pointfromgeohash(text, integer) to postgres;

grant execute on function st_pointfromgeohash(text, integer) to anon;

grant execute on function st_pointfromgeohash(text, integer) to authenticated;

grant execute on function st_pointfromgeohash(text, integer) to service_role;

