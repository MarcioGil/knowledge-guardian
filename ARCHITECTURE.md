# Arquitetura Técnica - Guardião do Conhecimento

## Visão Geral

O **Guardião do Conhecimento** é um jogo educativo full-stack que combina elementos de plataforma 2D, gamificação e inteligência artificial para criar uma experiência de aprendizado envolvente e adaptativa.

## Arquitetura do Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONT-END                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React + Phaser.js (Game Engine)                       │ │
│  │  - Movimentação de personagens                         │ │
│  │  - Sistema de física e colisões                        │ │
│  │  - Interface responsiva (mobile-first)                 │ │
│  │  - Gestão de estado com Context API                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API (HTTPS)
                            │
┌─────────────────────────────────────────────────────────────┐
│                        BACK-END                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Node.js + Express                                     │ │
│  │  - API RESTful                                         │ │
│  │  - Autenticação JWT                                    │ │
│  │  - Middleware de validação                             │ │
│  │  - Sistema de gamificação                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Módulo de IA                                          │ │
│  │  - Adaptação de dificuldade                            │ │
│  │  - Geração de desafios personalizados                  │ │
│  │  - Sistema de recomendação                             │ │
│  │  - Integração com OpenAI API                           │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
┌─────────────────────────────────────────────────────────────┐
│                      BANCO DE DADOS                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  SQLite (desenvolvimento) / PostgreSQL (produção)      │ │
│  │  - Usuários e autenticação                             │ │
│  │  - Progresso do jogador                                │ │
│  │  - Conquistas e pontuações                             │ │
│  │  - Conteúdo educativo                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

### Front-End
- **React 18**: Framework principal para UI
- **Phaser 3**: Engine de jogos 2D para movimentação e física
- **Vite**: Build tool e dev server
- **CSS Modules**: Estilização modular
- **Axios**: Cliente HTTP para comunicação com API

### Back-End
- **Node.js 22**: Runtime JavaScript
- **Express**: Framework web minimalista
- **JWT**: Autenticação stateless
- **bcrypt**: Hash de senhas
- **Sequelize**: ORM para banco de dados
- **OpenAI SDK**: Integração com IA

### Banco de Dados
- **SQLite**: Desenvolvimento local
- **PostgreSQL**: Produção (recomendado)

### DevOps
- **Git**: Controle de versão
- **GitHub Actions**: CI/CD (opcional)
- **Docker**: Containerização (opcional)

## Estrutura de Diretórios

```
knowledge-guardian/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (DB, JWT, etc)
│   │   ├── controllers/     # Controladores da API
│   │   ├── models/          # Modelos do banco de dados
│   │   ├── routes/          # Rotas da API
│   │   ├── services/        # Lógica de negócio
│   │   ├── middleware/      # Middlewares (auth, validation)
│   │   ├── ai/              # Módulo de IA
│   │   └── server.js        # Entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/              # Assets estáticos
│   │   ├── assets/          # Sprites, imagens, sons
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── scenes/          # Cenas do Phaser
│   │   ├── contexts/        # Context API
│   │   ├── services/        # Serviços (API calls)
│   │   ├── utils/           # Utilitários
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── docs/                    # Documentação adicional
├── README.md
├── ARCHITECTURE.md
├── LICENSE
└── .gitignore
```

## Modelo de Dados

### Tabela: users
```sql
- id (PK, UUID)
- username (STRING, UNIQUE)
- email (STRING, UNIQUE)
- password_hash (STRING)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: player_progress
```sql
- id (PK, UUID)
- user_id (FK -> users)
- current_level (INTEGER)
- total_score (INTEGER)
- experience_points (INTEGER)
- artifacts_collected (JSON)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: achievements
```sql
- id (PK, UUID)
- user_id (FK -> users)
- achievement_type (STRING)
- achievement_name (STRING)
- description (TEXT)
- unlocked_at (TIMESTAMP)
```

### Tabela: leaderboard
```sql
- id (PK, UUID)
- user_id (FK -> users)
- score (INTEGER)
- level (INTEGER)
- rank (INTEGER)
- updated_at (TIMESTAMP)
```

### Tabela: educational_content
```sql
- id (PK, UUID)
- category (STRING) # matemática, história, ciências
- difficulty (INTEGER) # 1-5
- question (TEXT)
- correct_answer (STRING)
- options (JSON)
- explanation (TEXT)
- created_at (TIMESTAMP)
```

### Tabela: ai_adaptations
```sql
- id (PK, UUID)
- user_id (FK -> users)
- performance_data (JSON)
- difficulty_level (INTEGER)
- recommended_content (JSON)
- updated_at (TIMESTAMP)
```

## API Endpoints

### Autenticação
```
POST   /api/auth/register    # Criar conta
POST   /api/auth/login       # Login
POST   /api/auth/logout      # Logout
GET    /api/auth/me          # Dados do usuário autenticado
```

### Progresso do Jogador
```
GET    /api/progress         # Obter progresso
PUT    /api/progress         # Atualizar progresso
POST   /api/progress/level   # Completar nível
```

### Gamificação
```
GET    /api/achievements     # Listar conquistas
POST   /api/achievements     # Desbloquear conquista
GET    /api/leaderboard      # Ranking global
GET    /api/leaderboard/me   # Posição do jogador
```

### Conteúdo Educativo
```
GET    /api/content          # Listar conteúdo
GET    /api/content/:id      # Obter conteúdo específico
POST   /api/content/answer   # Validar resposta
```

### IA
```
POST   /api/ai/adapt         # Adaptar dificuldade
POST   /api/ai/hint          # Obter dica
POST   /api/ai/generate      # Gerar novo desafio
```

## Sistema de Gamificação

### Pontuação
- **Resposta correta**: +100 pontos
- **Resposta rápida**: +50 pontos (bônus)
- **Combo**: +25 pontos por resposta consecutiva
- **Coletar artefato**: +200 pontos
- **Completar fase**: +500 pontos

### Níveis
- **Nível 1-5**: Iniciante (0-1000 XP)
- **Nível 6-10**: Aprendiz (1000-3000 XP)
- **Nível 11-15**: Estudioso (3000-6000 XP)
- **Nível 16-20**: Mestre (6000-10000 XP)
- **Nível 21+**: Guardião (10000+ XP)

### Conquistas
- 🏆 **Primeiro Passo**: Complete o tutorial
- 📚 **Colecionador**: Colete 10 artefatos
- 🎯 **Acerto Perfeito**: 10 respostas corretas seguidas
- ⚡ **Velocista**: Complete uma fase em menos de 2 minutos
- 🧠 **Gênio**: Acerte 50 questões de nível difícil
- 👑 **Top 10**: Entre no top 10 do ranking

## Sistema de IA

### Adaptação de Dificuldade
O sistema monitora o desempenho do jogador e ajusta automaticamente:
- **Taxa de acerto < 40%**: Reduz dificuldade
- **Taxa de acerto 40-70%**: Mantém dificuldade
- **Taxa de acerto > 70%**: Aumenta dificuldade

### Geração de Conteúdo
A IA pode gerar:
- Novas questões baseadas em tópicos específicos
- Dicas contextuais durante o jogo
- Explicações personalizadas para respostas incorretas
- Desafios adaptativos baseados no perfil do jogador

### Recomendação
O sistema recomenda:
- Áreas de conhecimento para revisar
- Fases adequadas ao nível de habilidade
- Estratégias de jogo personalizadas

## Mecânicas do Jogo

### Movimentação
- **Setas/WASD**: Mover personagem
- **Espaço**: Pular
- **E**: Interagir com objetos
- **Touch**: Controles virtuais (mobile)

### Fases
Cada fase contém:
1. **Exploração**: Movimentar-se pelo cenário
2. **Coleta**: Encontrar artefatos escondidos
3. **Desafios**: Resolver questões educativas
4. **Boss**: Desafio final da fase

### Progressão
- Completar desafios educativos para avançar
- Coletar artefatos para desbloquear áreas
- Ganhar XP e subir de nível
- Desbloquear conquistas

## Segurança

### Autenticação
- Senhas com hash bcrypt (salt rounds: 10)
- Tokens JWT com expiração de 24h
- Refresh tokens para sessões longas

### Validação
- Validação de entrada em todos os endpoints
- Sanitização de dados do usuário
- Rate limiting para prevenir abuso

### Proteção de Dados
- Variáveis de ambiente para secrets
- HTTPS obrigatório em produção
- CORS configurado adequadamente

## Performance

### Front-End
- Code splitting com React.lazy
- Lazy loading de assets do Phaser
- Cache de sprites e sons
- Otimização de renderização

### Back-End
- Cache de conteúdo educativo
- Índices no banco de dados
- Compressão de respostas (gzip)
- Connection pooling

## Deployment

### Desenvolvimento
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm run dev
```

### Produção
- **Backend**: Node.js em servidor (Heroku, Railway, AWS)
- **Frontend**: Build estático (Vercel, Netlify, GitHub Pages)
- **Banco**: PostgreSQL gerenciado (Supabase, Railway)

## Roadmap Futuro

### Fase 1 (MVP)
- ✅ Sistema de autenticação
- ✅ 5 fases jogáveis
- ✅ Sistema de pontuação básico
- ✅ Integração com IA

### Fase 2
- Multiplayer cooperativo
- Chat entre jogadores
- Mais categorias educativas
- Sistema de clãs/grupos

### Fase 3
- Modo offline
- Aplicativo nativo (React Native)
- Integração com escolas
- Dashboard para professores

## Referências

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [OpenAI API Reference](https://platform.openai.com/docs/)

