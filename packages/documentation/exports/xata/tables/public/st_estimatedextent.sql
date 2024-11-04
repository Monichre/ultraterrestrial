create function st_estimatedextent(text, text, text, boolean) returns box2d
    stable
    strict
    security definer
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_estimatedextent(text, text, text, boolean) is 'args: schema_name, table_name, geocolumn_name, parent_only - Returns the estimated extent of a spatial table.';

alter function st_estimatedextent(text, text, text, boolean) owner to supabase_admin;

grant execute on function st_estimatedextent(text, text, text, boolean) to postgres;

grant execute on function st_estimatedextent(text, text, text, boolean) to anon;

grant execute on function st_estimatedextent(text, text, text, boolean) to authenticated;

grant execute on function st_estimatedextent(text, text, text, boolean) to service_role;

create function st_estimatedextent(text, text, text) returns box2d
    stable
    strict
    security definer
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_estimatedextent(text, text, text) is 'args: schema_name, table_name, geocolumn_name - Returns the estimated extent of a spatial table.';

alter function st_estimatedextent(text, text, text) owner to supabase_admin;

grant execute on function st_estimatedextent(text, text, text) to postgres;

grant execute on function st_estimatedextent(text, text, text) to anon;

grant execute on function st_estimatedextent(text, text, text) to authenticated;

grant execute on function st_estimatedextent(text, text, text) to service_role;

create function st_estimatedextent(text, text) returns box2d
    stable
    strict
    security definer
    language c
as
$$
begin
-- missing source code
end;
$$;

comment on function st_estimatedextent(text, text) is 'args: table_name, geocolumn_name - Returns the estimated extent of a spatial table.';

alter function st_estimatedextent(text, text) owner to supabase_admin;

grant execute on function st_estimatedextent(text, text) to postgres;

grant execute on function st_estimatedextent(text, text) to anon;

grant execute on function st_estimatedextent(text, text) to authenticated;

grant execute on function st_estimatedextent(text, text) to service_role;

