create operator && (procedure = geometry_overlaps, leftarg = geometry, rightarg = geometry, commutator = &&, join = gserialized_gist_joinsel_2d, restrict = gserialized_gist_sel_2d);

alter operator &&(geometry, geometry) owner to supabase_admin;

create operator && (procedure = geography_overlaps, leftarg = geography, rightarg = geography, commutator = &&, join = gserialized_gist_joinsel_nd, restrict = gserialized_gist_sel_nd);

alter operator &&(geography, geography) owner to supabase_admin;

create operator && (procedure = overlaps_geog, leftarg = gidx, rightarg = gidx, commutator = &&);

alter operator &&(gidx, gidx) owner to supabase_admin;

create operator && (procedure = overlaps_2d, leftarg = box2df, rightarg = box2df, commutator = &&);

alter operator &&(box2df, box2df) owner to supabase_admin;

-- Cyclic dependencies found

create operator && (procedure = overlaps_2d, leftarg = box2df, rightarg = geometry, commutator = &&);

alter operator &&(box2df, geometry) owner to supabase_admin;

create operator && (procedure = overlaps_2d, leftarg = geometry, rightarg = box2df, commutator = &&);

alter operator &&(geometry, box2df) owner to supabase_admin;

-- Cyclic dependencies found

create operator && (procedure = overlaps_geog, leftarg = geography, rightarg = gidx, commutator = &&);

alter operator &&(geography, gidx) owner to supabase_admin;

create operator && (procedure = overlaps_geog, leftarg = gidx, rightarg = geography, commutator = &&);

alter operator &&(gidx, geography) owner to supabase_admin;

