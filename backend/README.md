# InteliZap Backend API

Backend para o sistema de gerenciamento WhatsApp InteliZap.

## 🚀 Como executar

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente
O arquivo `.env` já está configurado com suas credenciais do banco.

### 3. Executar em desenvolvimento
```bash
npm run dev
```

### 4. Executar em produção
```bash
npm start
```

A API estará rodando em: `http://localhost:3001`

## 📋 Endpoints disponíveis

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro

### Usuários (requer token)
- `GET /api/usuarios/:id` - Buscar usuário
- `PUT /api/usuarios/:id` - Atualizar usuário
- `DELETE /api/usuarios/:id` - Deletar usuário

### Grupos (requer token)
- `GET /api/grupos?usuario_id=1` - Listar grupos
- `GET /api/grupos/:id` - Buscar grupo com mensagens
- `POST /api/grupos` - Criar grupo
- `PUT /api/grupos/:id` - Atualizar grupo
- `DELETE /api/grupos/:id` - Deletar grupo

### Mensagens (requer token)
- `GET /api/mensagens?grupo_id=1` - Listar mensagens
- `POST /api/mensagens` - Criar mensagem
- `DELETE /api/mensagens/:id` - Deletar mensagem

### Health Check
- `GET /health` - Status da API

## 🔧 Exemplo de uso

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "seu@email.com", "senha": "suasenha"}'
```

### Buscar grupos (com token)
```bash
curl -X GET "http://localhost:3001/api/grupos?usuario_id=1" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🛡️ Segurança

- Senhas armazenadas em texto plano (para acesso administrativo)
- JWT para autenticação
- Rate limiting (1000 req/15min por IP)
- CORS configurado
- Headers de segurança (helmet)

## 📊 Estrutura do Banco

O sistema conecta diretamente com seu banco MySQL existente:
- `usuarios` - Dados dos usuários
- `grupos` - Grupos WhatsApp
- `mensagens` - Mensagens dos grupos
- `grupos-eventos` - Eventos dos grupos