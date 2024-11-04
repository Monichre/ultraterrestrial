create operator |>> (procedure = geometry_above, leftarg = geometry, rightarg = geometry, commutator = <<|, join = positionjoinsel, restrict = positionsel);

alter operator |>>(geometry, geometry) owner to supabase_admin;

