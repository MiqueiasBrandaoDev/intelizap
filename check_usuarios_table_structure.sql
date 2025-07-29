-- Script to check current usuarios table structure and verify if is_admin column exists

-- 1. Show current table structure
SELECT 'Current table structure:' as info;
DESCRIBE usuarios;

-- 2. Check if is_admin column exists
SELECT 'Checking for is_admin column:' as info;
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'usuarios' 
  AND TABLE_SCHEMA = DATABASE()
  AND COLUMN_NAME = 'is_admin';

-- 3. If the above query returns no results, the column doesn't exist
-- Count how many columns match (should be 1 if exists, 0 if not)
SELECT 'is_admin column exists:' as info,
       CASE 
         WHEN COUNT(*) > 0 THEN 'YES' 
         ELSE 'NO - NEEDS TO BE CREATED' 
       END as column_exists
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'usuarios' 
  AND TABLE_SCHEMA = DATABASE()
  AND COLUMN_NAME = 'is_admin';

-- 4. Show all column names for reference
SELECT 'All columns in usuarios table:' as info;
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'usuarios' 
  AND TABLE_SCHEMA = DATABASE()
ORDER BY ORDINAL_POSITION;

-- 5. Check current admin users (this will fail if is_admin column doesn't exist)
SELECT 'Current admin users:' as info;
-- SELECT id, nome, email, is_admin FROM usuarios WHERE is_admin = TRUE;