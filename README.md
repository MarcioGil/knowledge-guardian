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

* **Node.js 22** - Runtime JavaScript
* **Express.js 4** - Framework web robusto
* **Sequelize ORM** - Gerenciamento de banco
* **SQLite** - Banco de dados leve e rápido
* **JWT + bcrypt** - Autenticação segura
* **20 questões educativas** - Conteúdo seed

### 🎨 Frontend

* **React 18** - Biblioteca de interface
* **Phaser 3.90** - Engine de jogos 2D
* **TypeScript** - Tipagem estática
* **Vite** - Build tool moderna
* **Axios** - Cliente HTTP
* **CSS3** - Estilização responsiva

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
