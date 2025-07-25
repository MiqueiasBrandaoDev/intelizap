-- Adicionar coluna max_grupos na tabela usuarios
-- Valor padrão 3 para plano premium, 0 para usuários sem plano

ALTER TABLE usuarios 
ADD COLUMN max_grupos INT DEFAULT 3 COMMENT 'Número máximo de grupos permitidos para o usuário';

-- Atualizar usuários existentes baseado no plano_ativo
UPDATE usuarios 
SET max_grupos = CASE 
    WHEN plano_ativo = 1 THEN 3
    ELSE 0
END;

-- Verificar resultado
SELECT id, nome, email, plano_ativo, max_grupos FROM usuarios;