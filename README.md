# 🎓 Guardião do Conhecimento

**Um jogo educativo full-stack com gamificação, inteligência artificial e movimentação de personagens em tempo real.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Phaser](https://img.shields.io/badge/Phaser-3.90-purple.svg)](https://phaser.io/)

---

## 📋 Sobre o Projeto

O **Guardião do Conhecimento** é um jogo educativo que combina elementos de plataforma 2D, gamificação e inteligência artificial para criar uma experiência de aprendizado envolvente e adaptativa. Os jogadores exploram fases, coletam artefatos e respondem questões educativas para progredir, enquanto a IA adapta a dificuldade com base no desempenho individual.

### ✨ Características Principais

- **🎮 Jogo de Plataforma 2D**: Movimentação fluida com física realista usando Phaser.js
- **📚 Conteúdo Educativo**: Questões de múltiplas categorias (matemática, história, ciências, geografia, português)
- **🤖 IA Adaptativa**: Sistema inteligente que ajusta a dificuldade baseado no desempenho do jogador
- **🏆 Gamificação Completa**: Sistema de pontos, níveis, conquistas e ranking global
- **📱 Mobile-First**: Interface responsiva que funciona perfeitamente em dispositivos móveis
- **🔐 Autenticação Segura**: Sistema de login com JWT e criptografia bcrypt
- **⚡ API RESTful**: Backend robusto com Express.js e SQLite/PostgreSQL

---

## 🎯 Tecnologias Utilizadas

### Backend
- **Node.js 22** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Sequelize** - ORM para banco de dados
- **SQLite** (desenvolvimento) / **PostgreSQL** (produção)
- **JWT** - Autenticação stateless
- **OpenAI API** - Integração com inteligência artificial
- **bcrypt** - Hash seguro de senhas

### Frontend
- **React 18** - Biblioteca UI
- **Phaser 3.90** - Engine de jogos 2D
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes UI

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- npm ou pnpm
- Git

### 1. Clonar o Repositório

```bash
git clone https://github.com/MarcioGil/knowledge-guardian.git
cd knowledge-guardian
```

### 2. Configurar o Backend

```bash
cd backend
npm install

# Copiar arquivo de configuração
cp .env.example .env

# Editar .env com suas configurações
nano .env
```

**Variáveis de ambiente necessárias:**

```env
PORT=3000
NODE_ENV=development
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
JWT_SECRET=seu_secret_jwt_aqui
JWT_EXPIRES_IN=24h
OPENAI_API_KEY=sua_chave_openai_aqui
CORS_ORIGIN=http://localhost:5173
```

### 3. Inicializar o Banco de Dados

```bash
npm run init-db
```

Este comando criará todas as tabelas e populará o banco com questões educativas iniciais.

### 4. Iniciar o Backend

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 5. Configurar o Frontend

Em outro terminal:

```bash
cd ../frontend
pnpm install

# Configurar URL da API (opcional, já está configurado)
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

### 6. Iniciar o Frontend

```bash
pnpm dev
```

O jogo estará disponível em `http://localhost:5173`

---

## 🎮 Como Jogar

### Controles

- **Movimentação**: Setas ← → ou teclas A D
- **Pular**: Seta ↑ ou tecla W ou Espaço
- **Interagir**: Tecla E (quando disponível)

### Objetivo

1. **Explorar as fases**: Navegue pelos cenários usando os controles
2. **Coletar artefatos**: Encontre e colete todos os artefatos dourados (⭐)
3. **Evitar inimigos**: Cuidado com os inimigos vermelhos que patrulham as plataformas
4. **Entrar no portal**: Quando todos os artefatos forem coletados, entre no portal roxo
5. **Responder questões**: Complete os desafios educativos para avançar de fase
6. **Subir de nível**: Ganhe XP e pontos para desbloquear conquistas

### Sistema de Pontuação

- **Resposta correta**: +100 pontos
- **Resposta rápida** (< 10s): +50 pontos bônus
- **Coletar artefato**: +200 pontos
- **Completar fase**: +500 pontos

---

## 📚 Estrutura do Projeto

```
knowledge-guardian/
├── backend/                    # API Backend
│   ├── src/
│   │   ├── config/            # Configurações (DB, JWT)
│   │   ├── controllers/       # Controladores da API
│   │   ├── models/            # Modelos do banco de dados
│   │   ├── routes/            # Rotas da API
│   │   ├── services/          # Lógica de negócio
│   │   ├── middleware/        # Middlewares (auth, validation)
│   │   ├── ai/                # Módulo de IA
│   │   └── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/                   # Frontend React + Phaser
│   ├── client/
│   │   ├── public/            # Assets estáticos
│   │   │   └── assets/        # Sprites, sons, mapas
│   │   ├── src/
│   │   │   ├── game/          # Engine Phaser
│   │   │   │   ├── scenes/    # Cenas do jogo
│   │   │   │   ├── entities/  # Entidades (Player, Enemy)
│   │   │   │   └── config.ts  # Configuração Phaser
│   │   │   ├── pages/         # Páginas React
│   │   │   ├── components/    # Componentes UI
│   │   │   ├── contexts/      # Context API (Auth)
│   │   │   ├── services/      # API calls
│   │   │   └── App.tsx
│   │   └── package.json
│
├── docs/                       # Documentação adicional
├── ARCHITECTURE.md             # Arquitetura técnica
├── README.md                   # Este arquivo
└── LICENSE
```

---

## 🔌 API Endpoints

### Autenticação

```
POST   /api/auth/register    # Criar conta
POST   /api/auth/login       # Login
GET    /api/auth/me          # Dados do usuário autenticado
```

### Progresso do Jogador

```
GET    /api/progress                # Obter progresso
PUT    /api/progress                # Atualizar progresso
POST   /api/progress/stage/complete # Completar nível
POST   /api/progress/artifact/collect # Coletar artefato
```

### Gamificação

```
GET    /api/achievements      # Listar conquistas
POST   /api/achievements/unlock # Desbloquear conquista
GET    /api/leaderboard       # Ranking global
GET    /api/leaderboard/top   # Top jogadores
GET    /api/leaderboard/me    # Posição do jogador
```

### Conteúdo Educativo

```
GET    /api/content           # Listar conteúdo
GET    /api/content/adaptive  # Conteúdo adaptativo (IA)
GET    /api/content/:id       # Obter conteúdo específico
POST   /api/content/answer    # Validar resposta
GET    /api/content/categories # Listar categorias
```

### Inteligência Artificial

```
POST   /api/ai/hint           # Obter dica
POST   /api/ai/generate       # Gerar nova questão
GET    /api/ai/analysis       # Análise de desempenho
POST   /api/ai/explain        # Explicação personalizada
GET    /api/ai/learning-path  # Sugestões de estudo
POST   /api/ai/adapt          # Adaptar dificuldade
```

---

## 🏆 Sistema de Conquistas

| Ícone | Nome | Descrição |
|-------|------|-----------|
| 🎓 | Primeiro Passo | Complete o tutorial |
| 📚 | Colecionador | Colete 10 artefatos |
| 🎯 | Acerto Perfeito | 10 respostas corretas seguidas |
| ⚡ | Velocista | Complete uma fase em menos de 2 minutos |
| 🧠 | Gênio | Acerte 50 questões de nível difícil |
| 👑 | Top 10 | Entre no top 10 do ranking |
| ⭐ | Mestre de Níveis | Alcance o nível 10 |
| 🏆 | Conquistador de Fases | Complete todas as 5 fases |
| 📖 | Buscador de Conhecimento | Responda 100 questões corretamente |
| 💪 | Persistente | Jogue por 7 dias consecutivos |

---

## 🤖 Sistema de IA

A inteligência artificial do jogo oferece:

### Adaptação de Dificuldade

O sistema monitora automaticamente o desempenho e ajusta:
- **Taxa de acerto < 40%**: Reduz dificuldade
- **Taxa de acerto 40-70%**: Mantém dificuldade
- **Taxa de acerto > 70%**: Aumenta dificuldade

### Geração de Conteúdo

A IA pode gerar dinamicamente:
- Novas questões baseadas em tópicos específicos
- Dicas contextuais durante o jogo
- Explicações personalizadas para respostas incorretas
- Desafios adaptativos baseados no perfil do jogador

### Análise de Desempenho

O sistema fornece:
- Feedback personalizado sobre o progresso
- Identificação de áreas com dificuldade
- Sugestões de caminhos de aprendizado
- Recomendações de conteúdo

---

## 🔒 Segurança

- **Senhas**: Hash bcrypt com salt rounds = 10
- **Autenticação**: Tokens JWT com expiração de 24h
- **Validação**: Validação de entrada em todos os endpoints
- **Rate Limiting**: Proteção contra abuso de API
- **CORS**: Configurado adequadamente para produção
- **HTTPS**: Obrigatório em ambiente de produção

---

## 🚢 Deploy em Produção

### Backend

**Opções recomendadas:**
- [Railway](https://railway.app/)
- [Heroku](https://www.heroku.com/)
- [AWS EC2](https://aws.amazon.com/ec2/)
- [DigitalOcean](https://www.digitalocean.com/)

**Configurações importantes:**
1. Alterar `NODE_ENV=production`
2. Usar PostgreSQL em vez de SQLite
3. Configurar variáveis de ambiente seguras
4. Habilitar HTTPS
5. Configurar CORS para domínio de produção

### Frontend

**Opções recomendadas:**
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

**Build de produção:**

```bash
cd frontend
pnpm build
```

Os arquivos estarão em `frontend/dist/`

---

## 🧪 Testes

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
pnpm test
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas etapas:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Roadmap

### Fase 1 (MVP) ✅
- [x] Sistema de autenticação
- [x] 5 fases jogáveis
- [x] Sistema de pontuação básico
- [x] Integração com IA
- [x] Gamificação completa

### Fase 2 (Próximos Passos)
- [ ] Multiplayer cooperativo
- [ ] Chat entre jogadores
- [ ] Mais categorias educativas
- [ ] Sistema de clãs/grupos
- [ ] Modo história expandido

### Fase 3 (Futuro)
- [ ] Modo offline
- [ ] Aplicativo nativo (React Native)
- [ ] Integração com escolas
- [ ] Dashboard para professores
- [ ] Sistema de criação de conteúdo

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Marcio Gil**

- GitHub: [@MarcioGil](https://github.com/MarcioGil)
- Projeto: [knowledge-guardian](https://github.com/MarcioGil/knowledge-guardian)

---

## 🙏 Agradecimentos

- [Phaser.js](https://phaser.io/) - Engine de jogos 2D
- [OpenAI](https://openai.com/) - API de inteligência artificial
- [React](https://reactjs.org/) - Biblioteca UI
- [Express.js](https://expressjs.com/) - Framework web
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI

---

## 📞 Suporte

Se você tiver alguma dúvida ou problema, abra uma [issue](https://github.com/MarcioGil/knowledge-guardian/issues) no GitHub.

---

**Desenvolvido com ❤️ por Manus AI**

