create function geom4d_brin_inclusion_add_value(internal, internal, internal, internal) returns boolean
    parallel safe
    language c
as
$$
begin
-- missing source code
end;
$$;

alter function geom4d_brin_inclusion_add_value(internal, internal, internal, internal) owner to supabase_admin;

grant execute on function geom4d_brin_inclusion_add_value(internal, internal, internal, internal) to postgres;

grant execute on function geom4d_brin_inclusion_add_value(internal, internal, internal, internal) to anon;

grant execute on function geom4d_brin_inclusion_add_value(internal, internal, internal, internal) to authenticated;

grant execute on function geom4d_brin_inclusion_add_value(internal, internal, internal, internal) to service_role;
