create function st_astwkb(geom geometry, prec integer default NULL::integer, prec_z integer default NULL::integer, prec_m integer default NULL::integer, with_sizes boolean default NULL::boolean, with_boxes boolean default NULL::boolean) returns bytea
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

alter function st_astwkb(geometry, integer, integer, integer, boolean, boolean) owner to supabase_admin;

grant execute on function st_astwkb(geometry, integer, integer, integer, boolean, boolean) to postgres;

grant execute on function st_astwkb(geometry, integer, integer, integer, boolean, boolean) to anon;

grant execute on function st_astwkb(geometry, integer, integer, integer, boolean, boolean) to authenticated;

grant execute on function st_astwkb(geometry, integer, integer, integer, boolean, boolean) to service_role;

create function st_astwkb(geom geometry[], ids bigint[], prec integer default NULL::integer, prec_z integer default NULL::integer, prec_m integer default NULL::integer, with_sizes boolean default NULL::boolean, with_boxes boolean default NULL::boolean) returns bytea
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

alter function st_astwkb(geometry[], bigint[], integer, integer, integer, boolean, boolean) owner to supabase_admin;

grant execute on function st_astwkb(geometry[], bigint[], integer, integer, integer, boolean, boolean) to postgres;

grant execute on function st_astwkb(geometry[], bigint[], integer, integer, integer, boolean, boolean) to anon;

grant execute on function st_astwkb(geometry[], bigint[], integer, integer, integer, boolean, boolean) to authenticated;

grant execute on function st_astwkb(geometry[], bigint[], integer, integer, integer, boolean, boolean) to service_role;

