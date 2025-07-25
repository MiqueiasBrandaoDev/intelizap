# IntelliZapp.IA - Docker Deployment

Este arquivo contém instruções para executar o IntelliZapp.IA usando Docker.

## Pré-requisitos

- Docker (versão 20.10 ou superior)
- Docker Compose (versão 2.0 ou superior)
- 4GB RAM mínimo
- 10GB espaço em disco

## Configuração Inicial

### 1. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.docker .env
```

Edite o arquivo `.env` e configure:
- Senhas do banco de dados
- JWT Secret (use uma string aleatória e segura)
- URLs e chaves da Evolution API
- Outras configurações conforme necessário

### 2. Estrutura dos Serviços

O projeto utiliza os seguintes serviços:

- **Frontend (Nginx)**: Porta 80/443
- **Backend (Node.js)**: Porta 3001
- **Database (MySQL)**: Porta 3306
- **Redis (Cache)**: Porta 6379

## Comandos de Deployment

### Desenvolvimento

```bash
# Build e start de todos os serviços
docker-compose up --build

# Executar em background
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
```

### Produção

```bash
# Build e start otimizado para produção
docker-compose -f docker-compose.yml up -d --build

# Atualizar apenas um serviço
docker-compose up -d --no-deps --build backend

# Backup do banco de dados
docker-compose exec database mysqldump -u root -p intellizap > backup_$(date +%Y%m%d_%H%M%S).sql
```

## Comandos Úteis

### Monitoramento

```bash
# Status dos containers
docker-compose ps

# Uso de recursos
docker stats

# Health checks
docker-compose exec backend wget -qO- http://localhost:3001/health
docker-compose exec frontend wget -qO- http://localhost:80
```

### Manutenção

```bash
# Parar todos os serviços
docker-compose down

# Remover containers, redes e volumes
docker-compose down -v

# Limpar images não utilizadas
docker image prune -f

# Restart de um serviço específico
docker-compose restart backend

# Acessar shell de um container
docker-compose exec backend sh
docker-compose exec database mysql -u root -p
```

### Logs e Debug

```bash
# Logs em tempo real
docker-compose logs -f --tail=100

# Logs do último dia
docker-compose logs --since 24h

# Logs com timestamp
docker-compose logs -t

# Debug de um container específico
docker-compose exec backend npm run dev
```

## Volumes e Persistência

Os seguintes dados são persistidos:

- **mysql_data**: Dados do banco MySQL
- **redis_data**: Cache do Redis

### Backup e Restore

```bash
# Backup completo
docker-compose exec database mysqldump -u root -p --all-databases > full_backup.sql

# Restore
docker-compose exec -T database mysql -u root -p < full_backup.sql

# Backup de volume
docker run --rm -v intellizap_mysql_data:/data -v $(pwd):/backup alpine tar czf /backup/mysql_backup.tar.gz -C /data .
```

## SSL/HTTPS (Produção)

Para HTTPS em produção, adicione certificados SSL:

1. Coloque os certificados em `./ssl/`
2. Modifique o `nginx.conf` para incluir SSL
3. Atualize o `docker-compose.yml` para mapear a porta 443

## Troubleshooting

### Problemas Comuns

1. **Backend não conecta no banco**:
   ```bash
   docker-compose logs database
   docker-compose exec database mysql -u root -p -e "SHOW DATABASES;"
   ```

2. **Frontend não carrega**:
   ```bash
   docker-compose logs frontend
   docker-compose exec frontend nginx -t
   ```

3. **Permissions no Alpine Linux**:
   ```bash
   docker-compose exec backend chown -R nodejs:nodejs /app
   ```

4. **Problemas de rede**:
   ```bash
   docker network ls
   docker network inspect intellizap_intellizapp-network
   ```

### Performance

Para melhor performance em produção:

1. Adicione limits de recursos no docker-compose.yml:
```yaml
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
```

2. Configure buffer sizes do Nginx
3. Otimize queries do MySQL
4. Configure Redis para cache de sessões

## Segurança

- Altere todas as senhas padrão
- Use JWT secrets fortes
- Configure firewall para portas específicas
- Mantenha images atualizadas
- Use usuários não-root nos containers

## Monitoramento

Para produção, considere adicionar:

- Prometheus + Grafana para métricas
- ELK Stack para logs centralizados
- Health checks automáticos
- Alertas por email/Slack

## Atualizações

```bash
# Atualizar código
git pull

# Rebuild e restart
docker-compose up -d --build

# Migração de banco (se necessário)
docker-compose exec backend npm run migrate
```