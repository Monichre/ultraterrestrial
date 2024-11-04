-- 1. Add Error Handling and Logging
CREATE TABLE IF NOT EXISTS migration_logs (
    id SERIAL PRIMARY KEY,
    step TEXT NOT NULL,
    status TEXT NOT NULL,
    error_message TEXT,
    affected_rows INTEGER,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    duration INTERVAL
);

-- 2. Create Migration Function with Transaction Management
CREATE OR REPLACE FUNCTION perform_migration_step(
    step_name TEXT,
    migration_sql TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    start_time TIMESTAMPTZ;
    affected INTEGER;
    log_id INTEGER;
BEGIN
    start_time := NOW();
    
    -- Create log entry
    INSERT INTO migration_logs (step, status, started_at)
    VALUES (step_name, 'IN_PROGRESS', start_time)
    RETURNING id INTO log_id;
    
    -- Execute migration SQL
    EXECUTE migration_sql;
    GET DIAGNOSTICS affected = ROW_COUNT;
    
    -- Update log with success
    UPDATE migration_logs 
    SET status = 'COMPLETED',
        affected_rows = affected,
        completed_at = NOW(),
        duration = NOW() - start_time
    WHERE id = log_id;
    
    RETURN TRUE;
EXCEPTION WHEN OTHERS THEN
    -- Update log with failure
    UPDATE migration_logs 
    SET status = 'FAILED',
        error_message = SQLERRM,
        completed_at = NOW(),
        duration = NOW() - start_time
    WHERE id = log_id;
    
    RAISE NOTICE 'Migration step % failed: %', step_name, SQLERRM;
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

-- 3. Add Data Validation Functions
CREATE OR REPLACE FUNCTION validate_email(email TEXT) 
RETURNS BOOLEAN AS $$
BEGIN
    RETURN email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$';
END;
$$ LANGUAGE plpgsql;

-- 4. Add Data Type Conversion Functions
CREATE OR REPLACE FUNCTION safe_cast_to_timestamptz(v TEXT) 
RETURNS TIMESTAMPTZ AS $$
BEGIN
    RETURN v::TIMESTAMPTZ;
EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 5. Add Pre-migration Validation
CREATE OR REPLACE FUNCTION validate_migration_prerequisites()
RETURNS TABLE (
    check_name TEXT,
    status BOOLEAN,
    message TEXT
) AS $$
BEGIN
    -- Check if required extensions exist
    RETURN QUERY
    SELECT 
        'vector_extension'::TEXT,
        EXISTS (
            SELECT 1 
            FROM pg_extension 
            WHERE extname = 'vector'
        ),
        'Vector extension is required'::TEXT;

    -- Check for duplicate emails
    RETURN QUERY
    SELECT 
        'unique_emails'::TEXT,
        NOT EXISTS (
            SELECT email, COUNT(*)
            FROM staging_users
            GROUP BY email
            HAVING COUNT(*) > 1
        ),
        'Duplicate emails found in staging_users'::TEXT;

    -- Add more validation checks as needed
END;
$$ LANGUAGE plpgsql;

-- 6. Improved COPY Commands with Error Handling
CREATE OR REPLACE FUNCTION safe_copy_data(
    table_name TEXT,
    file_path TEXT,
    columns TEXT DEFAULT NULL
) RETURNS INTEGER AS $$
DECLARE
    copy_sql TEXT;
    affected INTEGER;
BEGIN
    copy_sql := format(
        'COPY %I %s FROM %L WITH (FORMAT CSV, HEADER true, FORCE_NULL (*))',
        table_name,
        COALESCE('(' || columns || ')', ''),
        file_path
    );
    
    EXECUTE copy_sql;
    GET DIAGNOSTICS affected = ROW_COUNT;
    
    RETURN affected;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error copying data into %: %', table_name, SQLERRM;
    RETURN -1;
END;
$$ LANGUAGE plpgsql;

-- 7. Add Progress Tracking
CREATE OR REPLACE VIEW migration_progress AS
SELECT 
    COUNT(*) FILTER (WHERE status = 'COMPLETED') AS completed_steps,
    COUNT(*) FILTER (WHERE status = 'FAILED') AS failed_steps,
    COUNT(*) FILTER (WHERE status = 'IN_PROGRESS') AS in_progress_steps,
    COUNT(*) AS total_steps,
    SUM(affected_rows) AS total_rows_migrated,
    MAX(completed_at) - MIN(started_at) AS total_duration
FROM migration_logs;

-- 8. Improved Foreign Key Handling
CREATE OR REPLACE FUNCTION verify_foreign_keys(table_name TEXT)
RETURNS TABLE (
    constraint_name TEXT,
    is_valid BOOLEAN,
    invalid_references INTEGER
) AS $$
BEGIN
    RETURN QUERY EXECUTE format('
        WITH fk_validation AS (
            SELECT 
                tc.constraint_name,
                COUNT(*) FILTER (WHERE ref_table.id IS NULL) AS invalid_refs
            FROM %I source_table
            CROSS JOIN LATERAL (
                SELECT conname, confrelid::regclass AS ref_table_name
                FROM pg_constraint
                WHERE conrelid = %L::regclass
                AND contype = ''f''
            ) cons(constraint_name, ref_table)
            LEFT JOIN LATERAL (
                SELECT id 
                FROM cons.ref_table 
                WHERE id = source_table.id
            ) ref_table ON true
            GROUP BY tc.constraint_name
        )
        SELECT 
            constraint_name,
            invalid_refs = 0 AS is_valid,
            invalid_refs
        FROM fk_validation;
    ', table_name, table_name);
END;
$$ LANGUAGE plpgsql;

-- 1. Add Batching Support
CREATE OR REPLACE FUNCTION batch_insert_data(
    source_table TEXT,
    target_table TEXT,
    batch_size INTEGER DEFAULT 10000
) RETURNS INTEGER AS $$
DECLARE
    total_rows INTEGER := 0;
    batch_rows INTEGER;
    last_id INTEGER := 0;
BEGIN
    LOOP
        EXECUTE format('
            WITH batch AS (
                SELECT *
                FROM %I
                WHERE id > $1
                ORDER BY id
                LIMIT $2
            )
            INSERT INTO %I
            SELECT * FROM batch
            RETURNING COUNT(*)',
            source_table, target_table)
        USING last_id, batch_size
        INTO batch_rows;

        EXIT WHEN batch_rows = 0;
        
        total_rows := total_rows + batch_rows;
        last_id := last_id + batch_size;
        
        COMMIT;
    END LOOP;
    
    RETURN total_rows;
END;
$$ LANGUAGE plpgsql;

-- 2. Add Data Verification
CREATE OR REPLACE FUNCTION verify_migration(
    staging_table TEXT,
    target_table TEXT,
    key_column TEXT DEFAULT 'id'
) RETURNS TABLE (
    check_type TEXT,
    status BOOLEAN,
    details JSONB
) AS $$
BEGIN
    RETURN QUERY
    
    -- Check row counts
    SELECT 
        'row_count'::TEXT,
        s.cnt = t.cnt,
        jsonb_build_object(
            'staging_count', s.cnt,
            'target_count', t.cnt,
            'difference', ABS(s.cnt - t.cnt)
        )
    FROM 
        (SELECT COUNT(*) cnt FROM staging_table) s,
        (SELECT COUNT(*) cnt FROM target_table) t
    
    UNION ALL
    
    -- Check for orphaned records
    SELECT
        'orphaned_records'::TEXT,
        COUNT(*) = 0,
        jsonb_build_object('orphaned_count', COUNT(*))
    FROM target_table t
    LEFT JOIN staging_table s USING (key_column)
    WHERE s.key_column IS NULL;
END;
$$ LANGUAGE plpgsql;

-- 3. Add Parallel Processing Support
CREATE OR REPLACE FUNCTION parallel_copy_data(
    source_table TEXT,
    target_table TEXT,
    partition_column TEXT,
    num_partitions INTEGER DEFAULT 4
) RETURNS VOID AS $$
DECLARE
    partition_sql TEXT;
    i INTEGER;
BEGIN
    FOR i IN 0..num_partitions-1 LOOP
        partition_sql := format('
            INSERT INTO %I
            SELECT *
            FROM %I
            WHERE MOD(%I::INTEGER, %s) = %s',
            target_table, source_table, partition_column, 
            num_partitions, i
        );
        
        PERFORM pg_background_result(pg_background_launch(partition_sql));
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 4. Add Rollback Support
CREATE OR REPLACE FUNCTION create_migration_savepoint(
    step_name TEXT
) RETURNS VOID AS $$
BEGIN
    EXECUTE format('SAVEPOINT migration_%s', step_name);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION rollback_migration_step(
    step_name TEXT
) RETURNS VOID AS $$
BEGIN
    EXECUTE format('ROLLBACK TO SAVEPOINT migration_%s', step_name);
END;
$$ LANGUAGE plpgsql;

-- 5. Add Progress Reporting
CREATE OR REPLACE FUNCTION report_migration_progress()
RETURNS TABLE (
    step TEXT,
    status TEXT,
    progress FLOAT,
    estimated_completion TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ml.step,
        ml.status,
        CASE 
            WHEN ml.affected_rows > 0 
            THEN (ml.affected_rows::FLOAT / 
                  (SELECT COUNT(*) FROM information_schema.columns 
                   WHERE table_name = ml.step)::FLOAT) * 100
            ELSE 0
        END as progress,
        CASE 
            WHEN ml.status = 'IN_PROGRESS' 
            THEN ml.started_at + 
                (NOW() - ml.started_at) * 
                (1 / (ml.affected_rows::FLOAT / 
                     (SELECT COUNT(*) FROM information_schema.columns 
                      WHERE table_name = ml.step)::FLOAT))
            ELSE NULL
        END as estimated_completion
    FROM migration_logs ml
    WHERE ml.completed_at IS NULL
    ORDER BY ml.started_at;
END;
$$ LANGUAGE plpgsql;

-- 6. Add Validation Constraints
ALTER TABLE staging_users
ADD CONSTRAINT check_email_format
CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

ALTER TABLE staging_events
ADD CONSTRAINT check_coordinates
CHECK (
    (latitude BETWEEN -90 AND 90) AND
    (longitude BETWEEN -180 AND 180)
);

-- 7. Add Index Management
CREATE OR REPLACE FUNCTION manage_migration_indexes(
    operation TEXT -- 'create' or 'drop'
) RETURNS VOID AS $$
DECLARE
    index_sql TEXT;
BEGIN
    IF operation = 'create' THEN
        -- Create temporary indexes for migration
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_temp_user_email 
        ON staging_users(email);
        
        CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_temp_event_date 
        ON staging_events(date);
        
        -- Add more temporary indexes as needed
    ELSIF operation = 'drop' THEN
        -- Drop temporary indexes after migration
        DROP INDEX CONCURRENTLY IF EXISTS idx_temp_user_email;
        DROP INDEX CONCURRENTLY IF EXISTS idx_temp_event_date;
        -- Drop other temporary indexes
    END IF;
END;
$$ LANGUAGE plpgsql;