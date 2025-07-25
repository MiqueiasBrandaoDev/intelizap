# IntelliZapp.IA - Deployment no EasyPanel

Este guia explica como fazer o deployment do IntelliZapp.IA no EasyPanel.

## 🚀 Compatibilidade

✅ **SIM, o Docker é totalmente compatível com EasyPanel!**

O EasyPanel suporta:
- Docker Compose
- Multi-container applications
- Volumes persistentes
- Variáveis de ambiente
- Health checks
- Networking automático

## 📋 Pré-requisitos

1. Conta no EasyPanel
2. Repositório Git (GitHub/GitLab) com o código
3. Domínio configurado (opcional)

## 🛠 Configuração no EasyPanel

### 1. Criar Nova Aplicação

1. Faça login no EasyPanel
2. Clique em "Create App"
3. Selecione "Docker Compose"
4. Configure o repositório Git

### 2. Configurar Docker Compose

Use o arquivo `docker-compose.easypanel.yml`:

```yaml
# Conteúdo já otimizado para EasyPanel
version: '3.8'

services:
  database:
    image: mysql:8.0
    # ... configurações adaptadas
  
  backend:
    build: ./backend
    # ... configurações adaptadas
  
  frontend:
    build: .
    # ... configurações adaptadas
```

### 3. Variáveis de Ambiente

Configure as seguintes variáveis no EasyPanel:

```bash
# Database
DB_ROOT_PASSWORD=sua_senha_root_mysql
DB_NAME=intellizap
DB_USER=intellizapp_user
DB_PASSWORD=sua_senha_mysql

# JWT
JWT_SECRET=sua_chave_jwt_muito_segura_aqui

# Evolution API
EVOLUTION_API_URL=sua_url_evolution_api
EVOLUTION_API_KEY=sua_chave_evolution_api
```

### 4. Configurar Domínios

No EasyPanel:
1. Vá em "Domains"
2. Adicione seu domínio
3. Configure SSL automático
4. Aponte para o serviço `frontend`

## 📁 Estrutura de Arquivos para EasyPanel

```
projeto/
├── docker-compose.easypanel.yml  # ← Use este
├── Dockerfile.easypanel          # ← Para frontend
├── nginx.easypanel.conf         # ← Nginx otimizado
├── backend/
│   └── Dockerfile.easypanel     # ← Para backend
└── .env.easypanel              # ← Variáveis exemplo
```

## 🔧 Configurações Específicas

### 1. Portas

- **Frontend**: 8080 (EasyPanel padrão)
- **Backend**: 3001
- **Database**: 3306 (interno)

### 2. Volumes

O EasyPanel gerencia volumes automaticamente:
- `mysql_data`: Dados persistentes do MySQL

### 3. Health Checks

Configurados para EasyPanel:
- **Backend**: `GET /health`
- **Frontend**: `GET /health`
- **Database**: MySQL ping

## 🚀 Deploy Steps

### Método 1: Git Repository

1. **Push para Git**:
   ```bash
   git add .
   git commit -m "Add EasyPanel configuration"
   git push origin main
   ```

2. **Configure no EasyPanel**:
   - Repository URL: `seu-repo-git`
   - Branch: `main`
   - Docker Compose file: `docker-compose.easypanel.yml`

3. **Deploy**:
   - EasyPanel fará build e deploy automaticamente

### Método 2: Manual Upload

1. **Zip do projeto**
2. **Upload no EasyPanel**
3. **Configure variables**
4. **Deploy**

## 🎯 Diferenças para EasyPanel

### Adaptações Feitas:

1. **Portas**:
   - Frontend: 80 → 8080
   - Nginx configurado para porta 8080

2. **Health Checks**:
   - Intervals otimizados
   - Start period aumentado

3. **CORS**:
   - Configurado para "*" (EasyPanel proxy)

4. **Logging**:
   - Logs direcionados para stdout
   - Compatível com EasyPanel logs

5. **Segurança**:
   - Users não-root
   - dumb-init para signal handling

## 🔍 Monitoramento

O EasyPanel fornece:
- **Logs em tempo real**
- **Métricas de CPU/RAM**
- **Status dos containers**
- **Health check status**

Acesse via dashboard do EasyPanel.

## 🛠 Troubleshooting

### ❌ Erro "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

**Problema**: Frontend tentando acessar API e recebendo HTML ao invés de JSON.

**Solução**: 
1. **Verificar se backend está rodando**:
   - EasyPanel → Services → Backend → Status
2. **Usar proxy reverso**:
   - Nginx configurado para proxy `/api/` → `backend:3001`
   - Frontend usa URLs relativas (sem domínio)
3. **Variáveis de ambiente**:
   ```bash
   VITE_API_URL=""  # Vazio para usar proxy
   ```

### 1. Build Failures

```bash
# Ver logs de build
# No EasyPanel dashboard → Logs → Build
```

### 2. Container Crashes

```bash
# Ver logs runtime
# No EasyPanel dashboard → Logs → Runtime
```

### 3. Database Connection

```bash
# Verificar variáveis de ambiente
# EasyPanel dashboard → Environment Variables
```

### 4. CORS Issues

**Solução**: Use proxy reverso (já configurado):
- Frontend: `fetch('/api/endpoint')`
- Nginx: `proxy_pass http://backend:3001/api/endpoint`

### 5. SSL Issues

```bash
# Reconfigurar domínio
# EasyPanel dashboard → Domains → Add Domain
```

## 📊 Performance

### Recursos Recomendados:

- **CPU**: 1-2 cores
- **RAM**: 2-4GB
- **Storage**: 10-20GB

### Otimizações:

- Multi-stage builds
- Nginx com compressão
- Cache de assets
- Health checks eficientes

## 🔒 Segurança

### Configurado:

- ✅ Usuários não-root
- ✅ Headers de segurança
- ✅ CORS adequado
- ✅ Secrets como env vars
- ✅ SSL automático (EasyPanel)

## 🔄 Updates

Para atualizar:

1. **Push código novo**
2. **EasyPanel rebuild automático**
3. **Zero downtime deployment**

## 💡 Dicas EasyPanel

1. **Use sempre health checks**
2. **Configure alertas de uptime**
3. **Monitore uso de recursos**
4. **Backup automático do MySQL**
5. **Use staging environment**

## ✅ Checklist Deployment

- [ ] Repositório Git configurado
- [ ] Variáveis de ambiente definidas
- [ ] Domínio apontado (se aplicável)
- [ ] SSL configurado
- [ ] Health checks funcionando
- [ ] Logs sendo coletados
- [ ] Backup configurado

**Resultado**: Aplicação rodando em produção no EasyPanel! 🎉