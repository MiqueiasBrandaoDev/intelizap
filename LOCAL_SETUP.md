# 🚀 Setup Local - InteliZap

Este setup replica exatamente o ambiente do EasyPanel para desenvolvimento local.

## 📋 Configuração

**Portas (igual ao EasyPanel):**
- Frontend: `http://localhost:3000` (Vite dev server)
- Backend: `http://localhost:3001` (Node.js/Express)

## 🛠️ Como rodar

### 1. Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Frontend (em outro terminal)
```bash
npm install
npm run dev
```

## 🌐 URLs de acesso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3000/health (via proxy)

## ⚙️ Configuração

- **Backend**: `.env.local` no diretório `backend/`
- **Frontend**: `.env.local` no diretório raiz

As configurações são idênticas ao EasyPanel para testes locais consistentes.

## 📝 Notas

- O Vite faz proxy de `/api/*` para o backend (porta 3001)
- Use as mesmas URLs da Evolution API do EasyPanel
- Configuração de CORS permite `localhost:3000`