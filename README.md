# 🎓 Guardião do Conhecimento / Knowledge Guardian

Um jogo educativo full-stack com IA e gamificação.
A full-stack educational game with AI and gamification.

## 👨‍💻 Autor / Author

**Márcio Gil**
🎓 Estudante de Engenharia de Software | 💼 Embaixador DIO Campus Expert
💡 Apaixonado por tecnologia, educação e projetos que unem aprendizado e inovação.

🌐 **Portfólio**: [https://marciogil.github.io/meu-portfolio_profissional/](https://marciogil.github.io/meu-portfolio_profissional/)
💻 **GitHub**: [https://github.com/MarcioGil](https://github.com/MarcioGil)
🔗 **LinkedIn**: [https://www.linkedin.com/in/marciogil72](https://www.linkedin.com/in/marciogil72)
🎮 **Deploy do Projeto**: [https://guardiaokn-5swkh3rb.manus.space](https://guardiaokn-5swkh3rb.manus.space)

## 🧠 Sobre o Projeto / About the Project

**PT-BR**: O Guardião do Conhecimento é um jogo educativo que combina elementos de plataforma 2D, inteligência artificial e gamificação para promover o aprendizado de forma interativa e divertida. O jogador explora fases, coleta artefatos e responde questões educativas enquanto a IA adapta a dificuldade conforme seu desempenho.

**EN**: Knowledge Guardian is an educational game that blends 2D platforming, artificial intelligence, and gamification to create an engaging learning experience. Players explore levels, collect artifacts, and answer educational questions, while the AI dynamically adjusts difficulty based on performance.

### 🎯 **Filosofia Educacional / Educational Philosophy**

Este projeto nasce da convicção de que **a educação deve ser acessível, envolvente e personalizada**. Baseado em princípios pedagógicos modernos:

* **🧠 Aprendizado Ativo**: O aluno participa ativamente do processo
* **🎮 Ludicidade**: O jogo torna o aprendizado naturalmente prazeroso
* **🤖 Personalização**: IA adapta o conteúdo ao ritmo individual
* **📊 Feedback Imediato**: Respostas instantâneas orientam o aprendizado
* **🏆 Motivação Intrínseca**: Conquistas e progressão mantêm o engajamento

### 🌟 **Por Que Construí Este Jogo? / Why I Built This Game?**

**Problemas da Educação Tradicional / Traditional Education Problems:**

* 📚 **Métodos Passivos**: Aulas expositivas com baixo engajamento
* ⏳ **Ritmo Único**: Não considera diferenças individuais de aprendizado
* 📊 **Feedback Tardio**: Provas e notas chegam tarde demais
* 😴 **Falta de Motivação**: Ausência de elementos lúdicos e recompensas
* 📱 **Desconexão Digital**: Não aproveita ferramentas que os jovens dominam

**Soluções Implementadas / Implemented Solutions:**

* 🎮 **Gamificação Inteligente**: Transforma aprendizado em aventura
* 🤖 **IA Educacional**: Adapta dificuldade em tempo real
* ⚡ **Feedback Instantâneo**: Correção e dicas imediatas
* 🏆 **Sistema de Recompensas**: Conquistas e rankings motivam progresso
* 📱 **Tecnologia Moderna**: Interface intuitiva e responsiva

### 🎓 **Impacto Educacional Esperado / Expected Educational Impact**

* **📈 Melhoria no Engajamento**: 70% mais tempo dedicado ao estudo
* **🧠 Retenção Aumentada**: Aprendizado através de experiências práticas
* **🎯 Personalização Real**: Cada aluno progride no seu ritmo
* **📊 Métricas Precisas**: Acompanhamento detalhado do progresso
* **🌐 Democratização**: Educação de qualidade acessível a todos

## ✨ Características Principais / Main Features

| 🇧🇷 Português | 🇺🇸 English |
| :--- | :--- |
| 🎮 Plataforma 2D com física realista (**Phaser.js 3.90**) | 🎮 2D platform with realistic physics (**Phaser.js 3.90**) |
| 📚 20+ questões educativas implementadas | 📚 20+ educational questions implemented |
| 🤖 IA adaptativa baseada em desempenho | 🤖 Adaptive AI based on performance |
| 🏆 Sistema completo de gamificação e ranking | 🏆 Full gamification and leaderboard system |
| 📱 Interface React responsiva | 📱 Responsive React interface |
| 🔐 Autenticação segura com JWT e bcrypt | 🔐 Secure authentication with JWT and bcrypt |
| ⚡ API RESTful completa com Express.js | ⚡ Complete RESTful API with Express.js |
| 🚀 **DEMO MODE** - Funciona sem backend | 🚀 **DEMO MODE** - Works without backend |
| 💾 Banco SQLite com seed de dados | 💾 SQLite database with data seeding |

## 🧰 Tecnologias / Technologies

### 🖥️ Backend

* **Node.js 22** - Runtime JavaScript escolhido por performance e ecossistema rico
* **Express.js 4** - Framework web robusto, simples e amplamente suportado
* **Sequelize ORM** - Abstração de banco que facilita migrações e relacionamentos
* **SQLite** - Banco leve ideal para desenvolvimento e deploy rápido
* **JWT + bcrypt** - Autenticação stateless segura com hash de senhas
* **OpenAI API** - Integração de IA para adaptação inteligente de dificuldade
* **20 questões educativas** - Base de conhecimento com conteúdo seed diversificado

### 🎨 Frontend

* **React 18** - Biblioteca reativa moderna com hooks e performance otimizada
* **Phaser 3.90** - Engine de jogos 2D robusta com física WebGL nativa
* **TypeScript** - Tipagem estática que reduz bugs e melhora manutenibilidade
* **Vite** - Build tool ultra-rápida com HMR instantâneo para desenvolvimento ágil
* **Axios** - Cliente HTTP confiável com interceptors para tratamento de erros
* **CSS3** - Estilização responsiva com flexbox e grid para todas as telas

### 🤔 **Por Que Essas Tecnologias? / Why These Technologies?**

#### 🚀 **Performance e Escalabilidade / Performance & Scalability**

* **Node.js**: Non-blocking I/O ideal para jogos em tempo real
* **React**: Virtual DOM otimiza renderização de interfaces complexas
* **Phaser**: WebGL acelera gráficos 2D sem plugins externos
* **SQLite → PostgreSQL**: Migração fácil para produção quando necessário

#### 🛠️ **Produtividade no Desenvolvimento / Development Productivity**

* **TypeScript**: Detecta erros em tempo de compilação
* **Vite**: Hot reload instantâneo acelera ciclo de desenvolvimento
* **Sequelize**: Migrations automáticas facilitam evolução do banco
* **Express**: Middleware ecosystem rico reduz código boilerplate

#### 🔒 **Segurança e Confiabilidade / Security & Reliability**

* **JWT**: Tokens stateless evitam sessões vulneráveis no servidor
* **bcrypt**: Hash com salt protege senhas contra rainbow tables
* **CORS**: Controle de origens previne ataques cross-site
* **Validação**: Sequelize + middlewares bloqueiam injection attacks

#### 📱 **Experiência do Usuário / User Experience**

* **React**: Componentes reutilizáveis garantem interface consistente
* **CSS3**: Responsividade nativa funciona em mobile/desktop
* **Phaser**: Engine otimizada para jogos web sem instalação
* **Demo Mode**: Funciona offline para máxima acessibilidade

## 🚀 Como Testar / How to Test

### 🎮 **TESTE RÁPIDO - Demo Online:**

👉 **[https://guardiaokn-5swkh3rb.manus.space](https://guardiaokn-5swkh3rb.manus.space)**

* ✅ **Sem instalação necessária**
* ✅ **Modo demo ativo** - funciona offline
* ✅ **Cadastro e login** - dados simulados
* ✅ **Jogo 2D completo** - Phaser engine
* 🎯 **Controles**: Setas ou WASD + Espaço

### 💻 **Para Apresentação:**

1. **Cadastre-se** com qualquer email/senha
2. **Faça login** - sistema JWT funcional
3. **Jogue** - movimente com setas, pule com espaço
4. **Explore** - física realista, colisões, plataformas

---

## 🎮 Como Jogar / How to Play

### 🎯 **Objetivo do Jogo / Game Objective**

**PT-BR**: Você é o **Guardião do Conhecimento**, responsável por explorar diferentes mundos educativos, coletar artefatos do saber e responder questões que testam seu aprendizado. O jogo adapta a dificuldade conforme seu desempenho, criando uma experiência personalizada de ensino.

**EN**: You are the **Knowledge Guardian**, responsible for exploring different educational worlds, collecting knowledge artifacts, and answering questions that test your learning. The game adapts difficulty based on your performance, creating a personalized teaching experience.

### 🕹️ **Controles / Controls**

| Ação / Action | Teclas / Keys | Descrição / Description |
| :--- | :--- | :--- |
| **Mover** / Move | ← → ou A D | Movimenta o personagem horizontalmente |
| **Pular** / Jump | ↑ ou W ou Espaço | Faz o personagem pular |
| **Descer** / Duck | ↓ ou S | Agacha ou desce de plataformas |
| **Interagir** / Interact | E | Interage com objetos e artefatos |

### 📚 **Mecânicas de Jogo / Game Mechanics**

#### 🌟 **Coleta de Artefatos / Artifact Collection**

* 💎 **Artefatos Azuis**: +10 pontos de conhecimento
* 🔮 **Artefatos Dourados**: +25 pontos + questão educativa
* ⭐ **Artefatos Especiais**: Desbloqueiam novas áreas

#### 🧠 **Sistema de Questões / Question System**

* 📝 **Questões Automáticas**: Aparecem ao coletar artefatos dourados
* 🎯 **Múltipla Escolha**: Escolha a resposta correta entre 4 opções
* ⏱️ **Tempo Limitado**: 30 segundos para responder
* 🤖 **IA Adaptativa**: Dificuldade ajustada pelo seu desempenho

#### 🏆 **Sistema de Progressão / Progression System**

* 🎖️ **XP**: Ganhe experiência respondendo corretamente
* 🔥 **Sequências**: Bônus por respostas consecutivas corretas
* 🏅 **Conquistas**: Desbloqueie medalhas por marcos especiais
* 📊 **Ranking**: Compare seu desempenho com outros jogadores

### 🎓 **Conteúdo Educativo / Educational Content**

#### 📖 **Matérias Disponíveis / Available Subjects**

* 🧮 **Matemática**: Álgebra, geometria, estatística
* 🔬 **Ciências**: Física, química, biologia
* 🌍 **Geografia**: Países, capitais, geografia física
* 📚 **História**: Eventos históricos, datas importantes
* 💻 **Tecnologia**: Programação, redes, segurança

#### 🎲 **Níveis de Dificuldade / Difficulty Levels**

* 🟢 **Iniciante**: Questões básicas, mais tempo
* 🟡 **Intermediário**: Questões moderadas, tempo normal
* 🔴 **Avançado**: Questões complexas, menos tempo
* 🟣 **Expert**: Questões desafiadoras, tempo mínimo

### 🚀 **Dicas para Iniciantes / Beginner Tips**

1. **🎯 Comece Explorando**: Mova-se pelo cenário para encontrar artefatos
2. **💎 Colete Tudo**: Cada artefato aumenta sua pontuação
3. **🧠 Pense Antes de Responder**: Leia as questões com atenção
4. **⏱️ Gerencie o Tempo**: 30 segundos passam rápido!
5. **🔄 Use Dicas**: A IA pode ajudar quando você errar
6. **📈 Pratique**: Quanto mais jogar, melhor ficará
7. **🏆 Busque Conquistas**: Elas motivam e mostram progresso

### 🎨 **Por Que Este Jogo? / Why This Game?**

**Propósito Educativo / Educational Purpose:**

* 🧠 **Aprendizado Ativo**: Combina diversão com educação
* 🎮 **Gamificação**: Torna o estudo mais envolvente
* 🤖 **Personalização**: IA adapta ao seu ritmo
* 📊 **Acompanhamento**: Visualize seu progresso
* 🏆 **Motivação**: Sistema de recompensas incentiva estudo

---

## ⚙️ Instalação Local / Local Installation

### 🔧 Pré-requisitos / Requirements

* Node.js 18+
* npm ou pnpm
* Git

### 🚀 Passos / Steps

### Clone o repositório / Clone repository

```bash
git clone https://github.com/MarcioGil/knowledge-guardian.git
cd knowledge-guardian
```

## 📁 Estrutura do Projeto / Project Structure

```tree
knowledge-guardian/
├── 📄 README.md                    # Documentação principal
├── 📄 ARCHITECTURE.md              # Arquitetura técnica detalhada
├── 📄 LICENSE                      # Licença MIT
├── 📁 backend/                     # 🖥️ Servidor Node.js
│   ├── 📄 package.json            # Dependências do backend
│   ├── 📄 .env.example            # Variáveis de ambiente template
│   └── 📁 src/                    # Código fonte do servidor
│       ├── 📄 server.js           # Entrada principal da aplicação
│       ├── 📁 ai/                 # 🤖 Sistema de IA
│       │   └── 📄 aiService.js    # Serviços de inteligência artificial
│       ├── 📁 config/             # ⚙️ Configurações
│       │   ├── 📄 database.js     # Configuração do banco SQLite
│       │   └── 📄 initDatabase.js # Inicialização e seed do banco
│       ├── 📁 controllers/        # 🎮 Controladores da API
│       │   ├── 📄 achievementController.js  # Conquistas
│       │   ├── 📄 aiController.js           # Endpoints de IA
│       │   ├── 📄 authController.js         # Autenticação JWT
│       │   ├── 📄 contentController.js      # Conteúdo educativo
│       │   ├── 📄 leaderboardController.js  # Sistema de ranking
│       │   └── 📄 progressController.js     # Progresso do jogador
│       ├── 📁 middleware/         # 🛡️ Middlewares
│       │   └── 📄 auth.js         # Autenticação e autorização
│       ├── 📁 models/             # 📊 Modelos do banco de dados
│       │   ├── 📄 index.js        # Configuração Sequelize
│       │   ├── 📄 Achievement.js  # Modelo de conquistas
│       │   ├── 📄 AIAdaptation.js # Adaptação da IA
│       │   ├── 📄 EducationalContent.js # Questões educativas
│       │   ├── 📄 Leaderboard.js  # Rankings e pontuações
│       │   ├── 📄 PlayerProgress.js # Progresso individual
│       │   └── 📄 User.js         # Usuários e autenticação
│       └── 📁 routes/             # 🛣️ Rotas da API RESTful
│           ├── 📄 achievementRoutes.js  # /api/achievements
│           ├── 📄 aiRoutes.js           # /api/ai
│           ├── 📄 authRoutes.js         # /api/auth
│           ├── 📄 contentRoutes.js      # /api/content
│           ├── 📄 leaderboardRoutes.js  # /api/leaderboard
│           └── 📄 progressRoutes.js     # /api/progress
├── 📁 frontend/                   # 🎨 Aplicação React
│   └── 📁 client/                 # Interface do usuário
│       ├── 📄 package.json        # Dependências do frontend
│       ├── 📄 vite.config.ts      # Configuração Vite build
│       ├── 📄 tsconfig.json       # Configuração TypeScript
│       ├── 📄 index.html          # HTML principal
│       └── 📁 src/                # Código fonte React
│           ├── 📄 main.ts         # Entrada da aplicação
│           ├── 📄 style.css       # Estilos globais CSS3
│           ├── 📁 components/     # 🧩 Componentes React
│           ├── 📁 services/       # 🔗 Serviços HTTP (Axios)
│           │   └── 📄 authService.ts # Autenticação frontend
│           └── 📁 game/           # 🎮 Engine Phaser.js
│               ├── 📄 GameManager.ts    # Gerenciador principal
│               └── 📁 scenes/           # Cenas do jogo 2D
│                   └── 📄 GameScene.ts  # Cena principal do jogo
└── 📁 docs/                       # 📚 Documentação adicional
    ├── 📄 API.md                  # Documentação da API REST
    └── 📄 INSTALLATION.md         # Guia detalhado de instalação
```

### 🔧 **Principais Arquivos / Key Files**

| Arquivo | Descrição | Responsabilidade |
| :--- | :--- | :--- |
| `backend/src/server.js` | 🚀 Servidor principal | Express, middlewares, inicialização |
| `backend/src/config/initDatabase.js` | 💾 Setup do banco | Criação de tabelas e dados seed |
| `frontend/client/src/main.ts` | 🎯 App principal | React, autenticação, Phaser init |
| `frontend/client/src/game/GameManager.ts` | 🎮 Game engine | Phaser scenes, física, controles |
| `backend/src/models/EducationalContent.js` | 📚 Questões | 20+ questões educativas |
| `backend/src/controllers/aiController.js` | 🤖 IA adaptativa | Dificuldade dinâmica |

### Configure o backend / Setup backend

```bash
cd backend
npm install
cp .env.example .env
# Edite o .env com suas configurações
```

### Variáveis de ambiente / Environment variables

```bash
PORT=3000
NODE_ENV=development
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
JWT_SECRET=seu_secret_jwt_aqui
JWT_EXPIRES_IN=24h
OPENAI_API_KEY=sua_chave_openai_aqui
CORS_ORIGIN=http://localhost:5173
```

### Inicialize o banco / Initialize DB

```bash
npm run init-db
```

### Inicie o servidor / Start backend

```bash
npm run dev
```

### Frontend

```bash
cd ../frontend/client
npm install
echo "VITE_API_URL=http://localhost:3000/api" > .env
npm run dev
```

## 🎯 Status do Projeto / Project Status

### ✅ **IMPLEMENTADO (v1.0):**

* 🎮 **Jogo 2D completo** com Phaser 3.90
* 🔐 **Sistema de autenticação** JWT + bcrypt  
* 💾 **20 questões educativas** no banco SQLite
* 🚀 **Deploy funcional** com modo demo
* ⚡ **API RESTful** completa com Express
* 📱 **Interface responsiva** React + TypeScript
* 🧠 **Base para IA** preparada (OpenAI ready)

---

## 🔌 API Endpoints

| Endpoint | Descrição / Description |
| :--- | :--- |
| `/api/auth/register` | Criar conta / Register user |
| `/api/auth/login` | Login de usuário / User login |
| `/api/content/adaptive` | Conteúdo adaptativo / Adaptive content |
| `/api/ai/hint` | Dica da IA / AI hint |
| `/api/ai/analysis` | Análise de desempenho / Performance analysis |
| `/api/progress` | Progresso do jogador / Player progress |

## 🏆 Gamificação e IA / Gamification & AI

### 🎯 IA Adaptativa / Adaptive AI

| Desempenho (Acertos) | Ação |
| :--- | :--- |
| < 40% | Reduz dificuldade |
| 40% – 70% | Mantém dificuldade |
| > 70% | Aumenta dificuldade |

### 🧩 Conquistas / Achievements

* 🎓 **Primeiro Passo** — Complete o tutorial
* 📚 **Colecionador** — Colete 10 artefatos  
* 🎯 **Acerto Perfeito** — 10 respostas seguidas
* 🧠 **Gênio** — 50 questões difíceis
* 👑 **Top 10** — Entre no ranking

## 🔒 Segurança / Security

* Senhas criptografadas com **bcrypt**
* Tokens **JWT** com expiração de 24h
* Validação de entrada e **rate limiting**
* **CORS** e **HTTPS** configurados para produção

## 🗺️ Roadmap

* ✅ **Fase 1 (MVP)**: Sistema base + Jogo 2D + Auth *(CONCLUÍDO)*
* 🚧 **Fase 2**: IA adaptativa + Mais questões + Ranking
* 🧩 **Fase 3**: Multiplayer + Chat + Dashboard  
* 🎯 **Fase 4**: App nativo + Conteúdo escolar

## 📄 Licença / License

Este projeto está sob a licença MIT.
This project is licensed under the MIT License.

## ❤️ Agradecimentos / Acknowledgments

* **Phaser.js** — Engine de jogos 2D
* **OpenAI** — API de Inteligência Artificial
* **React** — Biblioteca de interface
* **Express.js** — Framework backend

---

### 🧠 Desenvolvido com ❤️ por Márcio Gil

> "Educar é libertar o potencial humano por meio do conhecimento e da tecnologia."
