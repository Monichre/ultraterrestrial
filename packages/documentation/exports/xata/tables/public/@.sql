create operator @ (procedure = geometry_within, leftarg = geometry, rightarg = geometry, commutator = ~, join = contjoinsel, restrict = contsel);

alter operator @(geometry, geometry) owner to supabase_admin;

create operator @ (procedure = is_contained_2d, leftarg = geometry, rightarg = box2df, commutator = ~);

alter operator @(geometry, box2df) owner to supabase_admin;

create operator @ (procedure = is_contained_2d, leftarg = box2df, rightarg = geometry, commutator = ~);

alter operator @(box2df, geometry) owner to supabase_admin;

create operator @ (procedure = is_contained_2d, leftarg = box2df, rightarg = box2df, commutator = ~);

alter operator @(box2df, box2df) owner to supabase_admin;

