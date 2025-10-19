# 📦 Guia de Instalação Completo

Este guia fornece instruções detalhadas para instalar e configurar o **Guardião do Conhecimento** em diferentes ambientes.

---

## 📋 Índice

1. [Requisitos do Sistema](#requisitos-do-sistema)
2. [Instalação Local](#instalação-local)
3. [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
4. [Configuração da API OpenAI](#configuração-da-api-openai)
5. [Solução de Problemas](#solução-de-problemas)
6. [Deploy em Produção](#deploy-em-produção)

---

## 🖥️ Requisitos do Sistema

### Mínimos

- **Sistema Operacional**: Windows 10+, macOS 10.15+, ou Linux (Ubuntu 20.04+)
- **Node.js**: Versão 18.0 ou superior
- **RAM**: 4 GB
- **Espaço em Disco**: 500 MB

### Recomendados

- **Sistema Operacional**: Windows 11, macOS 13+, ou Linux (Ubuntu 22.04+)
- **Node.js**: Versão 22.0 ou superior
- **RAM**: 8 GB ou mais
- **Espaço em Disco**: 1 GB

### Software Necessário

- **Node.js e npm**: [Download](https://nodejs.org/)
- **Git**: [Download](https://git-scm.com/)
- **Editor de Código**: VS Code, Sublime Text, ou similar (opcional)

---

## 🚀 Instalação Local

### Passo 1: Verificar Instalações

Abra o terminal e verifique se Node.js e Git estão instalados:

```bash
node --version
# Deve mostrar v18.0.0 ou superior

npm --version
# Deve mostrar 8.0.0 ou superior

git --version
# Deve mostrar 2.0.0 ou superior
```

Se algum comando não funcionar, instale o software correspondente.

### Passo 2: Clonar o Repositório

```bash
git clone https://github.com/MarcioGil/knowledge-guardian.git
cd knowledge-guardian
```

### Passo 3: Instalar Dependências do Backend

```bash
cd backend
npm install
```

**Tempo estimado**: 2-3 minutos

**Possíveis problemas**:
- Se encontrar erro de permissão no Linux/Mac, use `sudo npm install`
- Se falhar, tente limpar o cache: `npm cache clean --force`

### Passo 4: Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Configuração do Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados (SQLite para desenvolvimento)
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite

# JWT (IMPORTANTE: Mude em produção!)
JWT_SECRET=mude_este_secret_em_producao_use_algo_aleatorio_e_longo
JWT_EXPIRES_IN=24h

# OpenAI (Obtenha em https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-proj-sua_chave_aqui

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Passo 5: Inicializar o Banco de Dados

```bash
npm run init-db
```

**Saída esperada**:
```
🔄 Iniciando sincronização do banco de dados...
✅ Banco de dados sincronizado com sucesso!
🌱 Populando banco com dados iniciais...
✅ 20 questões educativas criadas!
✅ Banco de dados inicializado com sucesso!
```

### Passo 6: Iniciar o Backend

```bash
npm run dev
```

**Saída esperada**:
```
✅ Conexão com o banco de dados estabelecida com sucesso.
✅ Modelos sincronizados com o banco de dados
🚀 Servidor rodando na porta 3000
📍 URL: http://localhost:3000
🌍 Ambiente: development
```

**Teste o backend**: Abra http://localhost:3000 no navegador. Você deve ver:

```json
{
  "success": true,
  "message": "API do Guardião do Conhecimento",
  "version": "1.0.0"
}
```

### Passo 7: Instalar Dependências do Frontend

Em **outro terminal** (mantenha o backend rodando):

```bash
cd ../frontend
pnpm install
```

**Nota**: Se você não tem pnpm instalado:

```bash
npm install -g pnpm
```

**Tempo estimado**: 3-5 minutos

### Passo 8: Configurar Frontend

Crie o arquivo `.env` (opcional, já tem valor padrão):

```bash
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

### Passo 9: Iniciar o Frontend

```bash
pnpm dev
```

**Saída esperada**:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Passo 10: Acessar o Jogo

Abra seu navegador em: **http://localhost:5173**

Você verá a tela de login. Crie uma conta e comece a jogar!

---

## 🗄️ Configuração do Banco de Dados

### SQLite (Desenvolvimento)

O SQLite é usado por padrão para desenvolvimento. Não requer configuração adicional.

**Localização do arquivo**: `backend/database.sqlite`

**Resetar banco de dados**:

```bash
cd backend
rm database.sqlite
npm run init-db
```

### PostgreSQL (Produção)

Para usar PostgreSQL em produção:

#### 1. Instalar PostgreSQL

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS** (com Homebrew):
```bash
brew install postgresql
brew services start postgresql
```

**Windows**: [Download](https://www.postgresql.org/download/windows/)

#### 2. Criar Banco de Dados

```bash
sudo -u postgres psql

CREATE DATABASE knowledge_guardian;
CREATE USER kg_user WITH PASSWORD 'sua_senha_segura';
GRANT ALL PRIVILEGES ON DATABASE knowledge_guardian TO kg_user;
\q
```

#### 3. Configurar .env

```env
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=knowledge_guardian
DB_USER=kg_user
DB_PASSWORD=sua_senha_segura
```

#### 4. Instalar Driver PostgreSQL

```bash
cd backend
npm install pg pg-hstore
```

#### 5. Inicializar Banco

```bash
npm run init-db
```

---

## 🤖 Configuração da API OpenAI

A IA do jogo usa a API da OpenAI para gerar conteúdo adaptativo.

### Passo 1: Criar Conta OpenAI

1. Acesse: https://platform.openai.com/signup
2. Crie uma conta ou faça login
3. Adicione um método de pagamento (necessário para usar a API)

### Passo 2: Obter Chave da API

1. Vá para: https://platform.openai.com/api-keys
2. Clique em "Create new secret key"
3. Dê um nome (ex: "Knowledge Guardian")
4. Copie a chave (começa com `sk-proj-...`)

### Passo 3: Configurar no Projeto

Edite `backend/.env`:

```env
OPENAI_API_KEY=sk-proj-sua_chave_aqui
```

### Custos Estimados

O jogo usa o modelo `gpt-4.1-mini`, que é econômico:

- **Custo por 1M tokens de entrada**: $0.15
- **Custo por 1M tokens de saída**: $0.60
- **Uso médio por jogador/hora**: ~$0.01-0.05

**Dica**: Configure limites de gastos no painel da OpenAI.

### Modo Sem IA (Opcional)

Se não quiser usar IA, o jogo ainda funciona com conteúdo pré-carregado. As features de IA simplesmente retornarão mensagens padrão.

---

## 🔧 Solução de Problemas

### Erro: "Port 3000 already in use"

**Problema**: Outra aplicação está usando a porta 3000.

**Solução 1** - Mudar a porta:
```bash
# Edite backend/.env
PORT=3001
```

**Solução 2** - Matar o processo:
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "Cannot find module"

**Problema**: Dependências não instaladas corretamente.

**Solução**:
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Erro: "ECONNREFUSED" no Frontend

**Problema**: Backend não está rodando ou URL incorreta.

**Solução**:
1. Verifique se o backend está rodando em http://localhost:3000
2. Verifique o arquivo `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
3. Reinicie o frontend

### Erro: "Invalid token" ou "401 Unauthorized"

**Problema**: Token JWT expirado ou inválido.

**Solução**:
1. Faça logout e login novamente
2. Limpe o localStorage do navegador:
   - Abra DevTools (F12)
   - Console → `localStorage.clear()`
   - Recarregue a página

### Erro: "OpenAI API key invalid"

**Problema**: Chave da API incorreta ou expirada.

**Solução**:
1. Verifique se a chave está correta no `.env`
2. Gere uma nova chave em https://platform.openai.com/api-keys
3. Verifique se tem créditos disponíveis na conta OpenAI

### Banco de Dados Corrompido

**Problema**: Dados inconsistentes ou erros de SQL.

**Solução**:
```bash
cd backend
rm database.sqlite
npm run init-db
```

**Atenção**: Isso apagará todos os dados!

### Phaser não Carrega no Frontend

**Problema**: Erro ao inicializar o jogo.

**Solução**:
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Verifique o console do navegador (F12) para erros
3. Reinstale as dependências do frontend

---

## 🚢 Deploy em Produção

### Backend no Railway

1. Crie conta em https://railway.app
2. Conecte seu repositório GitHub
3. Configure variáveis de ambiente:
   - `NODE_ENV=production`
   - `JWT_SECRET=secret_aleatorio_seguro`
   - `OPENAI_API_KEY=sua_chave`
   - `CORS_ORIGIN=https://seu-dominio.com`
4. Railway detectará automaticamente Node.js
5. Deploy automático a cada push

### Backend no Heroku

```bash
# Instalar Heroku CLI
npm install -g heroku

# Login
heroku login

# Criar app
heroku create knowledge-guardian-api

# Adicionar PostgreSQL
heroku addons:create heroku-postgresql:mini

# Configurar variáveis
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=secret_aleatorio_seguro
heroku config:set OPENAI_API_KEY=sua_chave

# Deploy
git subtree push --prefix backend heroku main

# Inicializar banco
heroku run npm run init-db
```

### Frontend na Vercel

1. Crie conta em https://vercel.com
2. Importe o repositório GitHub
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist`
4. Adicione variável de ambiente:
   - `VITE_API_URL=https://seu-backend.railway.app/api`
5. Deploy!

### Frontend na Netlify

```bash
cd frontend
pnpm build

# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

Configure variável de ambiente no painel Netlify:
- `VITE_API_URL=https://seu-backend.railway.app/api`

---

## ✅ Checklist de Instalação

- [ ] Node.js 18+ instalado
- [ ] Git instalado
- [ ] Repositório clonado
- [ ] Dependências do backend instaladas
- [ ] Arquivo `.env` configurado no backend
- [ ] Banco de dados inicializado
- [ ] Backend rodando em http://localhost:3000
- [ ] Dependências do frontend instaladas
- [ ] Frontend rodando em http://localhost:5173
- [ ] Conta criada no jogo
- [ ] Primeira fase jogada com sucesso

---

## 📞 Suporte

Se você encontrar problemas não listados aqui:

1. Verifique as [Issues no GitHub](https://github.com/MarcioGil/knowledge-guardian/issues)
2. Abra uma nova issue com:
   - Descrição do problema
   - Mensagens de erro completas
   - Sistema operacional e versões
   - Passos para reproduzir

---

**Boa sorte e divirta-se aprendendo! 🎓🎮**

