-- Criar tabela resumos se não existir
CREATE TABLE IF NOT EXISTS resumos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  grupo_id INT NOT NULL,
  usuario_id INT NOT NULL,
  conteudo TEXT NOT NULL,
  total_mensagens INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pendente',
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_envio TIMESTAMP NULL,
  FOREIGN KEY (grupo_id) REFERENCES grupos(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Inserir dados de exemplo para testar
INSERT IGNORE INTO resumos (id, grupo_id, usuario_id, conteudo, total_mensagens, status, data_criacao, data_envio) VALUES
(1, 1, 9, '📊 **Resumo do Grupo - Grupo Teste**\n📅 Data: 23/07/2025\n\n📈 **Atividade:**\n• Total de mensagens analisadas: 25\n• Período: 20/07/2025 - 23/07/2025\n\n💬 **Principais Participantes:**\n• João Silva\n• Maria Santos\n• Pedro Costa\n\n📝 **Resumo das Conversas:**\nAs conversas no grupo incluíram 25 mensagens com participação ativa dos membros. Principais tópicos discutidos foram sobre o projeto e próximas reuniões.\n\n🎯 **Status:** Resumo gerado automaticamente pelo InteliZap', 25, 'enviado', '2025-07-23 08:30:00', '2025-07-23 09:00:00'),
(2, 2, 9, '📊 **Resumo do Grupo - Grupo Trabalho**\n📅 Data: 23/07/2025\n\n📈 **Atividade:**\n• Total de mensagens analisadas: 18\n• Período: 22/07/2025 - 23/07/2025\n\n💬 **Principais Participantes:**\n• Ana Paula\n• Carlos Lima\n• Roberto Silva\n\n📝 **Resumo das Conversas:**\nDiscussões sobre tarefas e prazos do projeto. Houve alinhamento sobre entregas da semana.\n\n🎯 **Status:** Resumo gerado automaticamente pelo InteliZap', 18, 'enviado', '2025-07-22 15:45:00', '2025-07-23 09:00:00'),
(3, 1, 9, '📊 **Resumo do Grupo - Grupo Teste**\n📅 Data: 22/07/2025\n\n📈 **Atividade:**\n• Total de mensagens analisadas: 12\n• Período: 21/07/2025 - 22/07/2025\n\n💬 **Principais Participantes:**\n• João Silva\n• Maria Santos\n\n📝 **Resumo das Conversas:**\nConversas sobre planejamento e organização de atividades.\n\n🎯 **Status:** Resumo gerado automaticamente pelo InteliZap', 12, 'enviado', '2025-07-21 14:20:00', '2025-07-22 09:00:00');