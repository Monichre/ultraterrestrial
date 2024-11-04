create function hamming_distance(bit, bit) returns double precision
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

alter function hamming_distance(bit, bit) owner to supabase_admin;

grant execute on function hamming_distance(bit, bit) to postgres;

grant execute on function hamming_distance(bit, bit) to anon;

grant execute on function hamming_distance(bit, bit) to authenticated;

grant execute on function hamming_distance(bit, bit) to service_role;

