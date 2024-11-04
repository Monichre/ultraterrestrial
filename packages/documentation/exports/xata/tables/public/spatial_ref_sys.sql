create table spatial_ref_sys
(
    srid      integer not null
        primary key
        constraint spatial_ref_sys_srid_check
            check ((srid > 0) AND (srid <= 998999)),
    auth_name varchar(256),
    auth_srid integer,
    srtext    varchar(2048),
    proj4text varchar(2048)
);

alter table spatial_ref_sys
    owner to supabase_admin;

grant select on spatial_ref_sys to public;

grant delete, insert, references, select, trigger, truncate, update on spatial_ref_sys to postgres;

grant delete, insert, references, select, trigger, truncate, update on spatial_ref_sys to anon;

grant delete, insert, references, select, trigger, truncate, update on spatial_ref_sys to authenticated;

grant delete, insert, references, select, trigger, truncate, update on spatial_ref_sys to service_role;

