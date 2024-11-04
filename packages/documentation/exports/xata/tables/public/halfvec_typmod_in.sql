create function halfvec_typmod_in(cstring[]) returns integer
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

alter function halfvec_typmod_in(cstring[]) owner to supabase_admin;

grant execute on function halfvec_typmod_in(cstring[]) to postgres;

grant execute on function halfvec_typmod_in(cstring[]) to anon;

grant execute on function halfvec_typmod_in(cstring[]) to authenticated;

grant execute on function halfvec_typmod_in(cstring[]) to service_role;

