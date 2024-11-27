
CREATE OR REPLACE PROCEDURE migrate_table_with_mapping(
    source_schema TEXT,
    source_table TEXT,
    target_schema TEXT,
    target_table TEXT,
    mapping_table TEXT,
    columns TEXT[],
    foreign_key_mappings JSONB DEFAULT '{}'::JSONB
)
LANGUAGE plpgsql
AS $$
DECLARE
    column_list TEXT;
    select_list TEXT := '';
    join_clauses TEXT := '';
    fk_column TEXT;
    fk_mapping_table TEXT;
    rec RECORD;
BEGIN
    -- Construct column list for INSERT
    column_list := array_to_string(columns, ', ');

    -- Construct SELECT list with foreign key mappings
    FOREACH fk_column IN ARRAY keys(foreign_key_mappings)
    LOOP
        select_list := select_list || format('m_%I.new_id AS %I, ', fk_column, fk_column);
        join_clauses := join_clauses || format('LEFT JOIN %I_id_mapping m_%I ON s.%I = m_%I.old_id ', 
            fk_column, fk_column, fk_column, fk_column);
    END LOOP;

    -- Add non-foreign key columns to SELECT list
    FOR rec IN SELECT * FROM unnest(columns) AS c(col) WHERE c.col NOT IN (SELECT key FROM jsonb_each_text(foreign_key_mappings))
    LOOP
        select_list := select_list || format('s.%I, ', rec.col);
    END LOOP;

    -- Remove trailing comma and space
    select_list := regexp_replace(select_list, ', $', '');

    -- Begin Transaction
    BEGIN
        EXECUTE format('BEGIN');

        -- Insert into target table and capture mapping
        EXECUTE format('
            INSERT INTO %I.%I (%s)
            SELECT %s
            FROM %I.%I s
            %s
            RETURNING s.id AS old_id, %I.%I.id AS new_id
            INTO TEMP TABLE temp_mapping
        ',
            target_schema, target_table,
            column_list,
            select_list,
            source_schema, source_table,
            join_clauses,
            target_schema, target_table
        );

        -- Populate the mapping table
        EXECUTE format('
            INSERT INTO %I (old_id, new_id)
            SELECT old_id, new_id FROM temp_mapping
        ', mapping_table);

        EXECUTE format('COMMIT');
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'Error migrating table %, rolling back.', target_table;
        EXECUTE format('ROLLBACK');
        RAISE;
    END;
END;
$$;