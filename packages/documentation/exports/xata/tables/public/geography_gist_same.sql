create function geography_gist_same(box2d, box2d, internal) returns internal
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geography_gist_same(box2d, box2d, internal) owner to supabase_admin;

grant execute on function geography_gist_same(box2d, box2d, internal) to postgres;

grant execute on function geography_gist_same(box2d, box2d, internal) to anon;

grant execute on function geography_gist_same(box2d, box2d, internal) to authenticated;

grant execute on function geography_gist_same(box2d, box2d, internal) to service_role;

