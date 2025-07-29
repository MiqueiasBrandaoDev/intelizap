-- Script para adicionar coluna is_admin na tabela usuarios
-- Execute este script no banco de dados MySQL

-- Verificar se a coluna já existe antes de adicionar
SET @sql = '';
SELECT COUNT(*) INTO @exist FROM information_schema.columns 
WHERE table_schema = database() 
AND table_name = 'usuarios' 
AND column_name = 'is_admin';

SET @sql = CASE 
    WHEN @exist = 0 THEN 'ALTER TABLE usuarios ADD COLUMN is_admin BOOLEAN DEFAULT FALSE AFTER email;'
    ELSE 'SELECT "Coluna is_admin já existe na tabela usuarios" as status;'
END;

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Mostrar estrutura da tabela após mudanças
DESCRIBE usuarios;