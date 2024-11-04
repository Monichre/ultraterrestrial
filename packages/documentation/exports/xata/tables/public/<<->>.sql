create operator <<->> (procedure = geometry_distance_centroid_nd, leftarg = geometry, rightarg = geometry, commutator = <<->>);

alter operator <<->>(geometry, geometry) owner to supabase_admin;

