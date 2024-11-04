create function st_box2dfromgeohash(text, integer default NULL::integer) returns box2d
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

alter function st_box2dfromgeohash(text, integer) owner to supabase_admin;

grant execute on function st_box2dfromgeohash(text, integer) to postgres;

grant execute on function st_box2dfromgeohash(text, integer) to anon;

grant execute on function st_box2dfromgeohash(text, integer) to authenticated;

grant execute on function st_box2dfromgeohash(text, integer) to service_role;

