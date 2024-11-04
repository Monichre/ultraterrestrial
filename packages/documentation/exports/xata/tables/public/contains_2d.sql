create function contains_2d(box2df, geometry) returns boolean
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function contains_2d(box2df, geometry) owner to supabase_admin;

grant execute on function contains_2d(box2df, geometry) to postgres;

grant execute on function contains_2d(box2df, geometry) to anon;

grant execute on function contains_2d(box2df, geometry) to authenticated;

grant execute on function contains_2d(box2df, geometry) to service_role;

create function contains_2d(box2df, box2df) returns boolean
    immutable
    strict
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function contains_2d(box2df, box2df) owner to supabase_admin;

grant execute on function contains_2d(box2df, box2df) to postgres;

grant execute on function contains_2d(box2df, box2df) to anon;

grant execute on function contains_2d(box2df, box2df) to authenticated;

grant execute on function contains_2d(box2df, box2df) to service_role;

create function contains_2d(geometry, box2df) returns boolean
    immutable
    strict
    parallel safe
    cost 1
    language sql
as
$$SELECT $2 OPERATOR(public.@) $1;$$;

alter function contains_2d(geometry, box2df) owner to supabase_admin;

grant execute on function contains_2d(geometry, box2df) to postgres;

grant execute on function contains_2d(geometry, box2df) to anon;

grant execute on function contains_2d(geometry, box2df) to authenticated;

grant execute on function contains_2d(geometry, box2df) to service_role;

