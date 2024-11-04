create function st_summary(geometry) returns text
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

comment on function st_summary(geometry) is 'args: g - Returns a text summary of the contents of a geometry.';

alter function st_summary(geometry) owner to supabase_admin;

grant execute on function st_summary(geometry) to postgres;

grant execute on function st_summary(geometry) to anon;

grant execute on function st_summary(geometry) to authenticated;

grant execute on function st_summary(geometry) to service_role;

create function st_summary(geography) returns text
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

comment on function st_summary(geography) is 'args: g - Returns a text summary of the contents of a geometry.';

alter function st_summary(geography) owner to supabase_admin;

grant execute on function st_summary(geography) to postgres;

grant execute on function st_summary(geography) to anon;

grant execute on function st_summary(geography) to authenticated;

grant execute on function st_summary(geography) to service_role;

