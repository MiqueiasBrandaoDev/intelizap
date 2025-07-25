-- Criar tabela de resumos
CREATE TABLE `resumos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grupo_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `conteudo` longtext NOT NULL,
  `total_mensagens` int DEFAULT 0,
  `status` enum('enviado','erro','pendente') DEFAULT 'pendente',
  `data_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `data_envio` datetime DEFAULT NULL,
  `erro_msg` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `grupo_id` (`grupo_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `data_criacao` (`data_criacao`),
  KEY `status` (`status`),
  CONSTRAINT `resumos_ibfk_1` FOREIGN KEY (`grupo_id`) REFERENCES `grupos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `resumos_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;