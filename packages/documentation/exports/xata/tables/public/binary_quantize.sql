create function binary_quantize(vector) returns bit
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

alter function binary_quantize(vector) owner to supabase_admin;

grant execute on function binary_quantize(vector) to postgres;

grant execute on function binary_quantize(vector) to anon;

grant execute on function binary_quantize(vector) to authenticated;

grant execute on function binary_quantize(vector) to service_role;

create function binary_quantize(halfvec) returns bit
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

alter function binary_quantize(halfvec) owner to supabase_admin;

grant execute on function binary_quantize(halfvec) to postgres;

grant execute on function binary_quantize(halfvec) to anon;

grant execute on function binary_quantize(halfvec) to authenticated;

grant execute on function binary_quantize(halfvec) to service_role;

