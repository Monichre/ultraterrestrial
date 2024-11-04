create function st_fromflatgeobuf(anyelement, bytea) returns setof setof anyelement
    immutable
    parallel safe
    cost 500
    language c
as
$$
begin
-- missing source code
end;

$$;

alter function st_fromflatgeobuf(anyelement, bytea) owner to supabase_admin;

grant execute on function st_fromflatgeobuf(anyelement, bytea) to postgres;

grant execute on function st_fromflatgeobuf(anyelement, bytea) to anon;

grant execute on function st_fromflatgeobuf(anyelement, bytea) to authenticated;

grant execute on function st_fromflatgeobuf(anyelement, bytea) to service_role;

