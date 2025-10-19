🎓 Guardião do Conhecimento / Knowledge Guardian

Um jogo educativo full-stack com IA e gamificação
A full-stack educational game with AI and gamification

👨‍💻 Autor / Author

Márcio Gil
🎓 Estudante de Engenharia de Software | 💼 Embaixador DIO Campus Expert
💡 Apaixonado por tecnologia, educação e projetos que unem aprendizado e inovação.

🌐 Portfólio: https://marciogil.github.io/meu-portfolio_profissional/

💻 GitHub: https://github.com/MarcioGil

🔗 LinkedIn: https://www.linkedin.com/in/marciogil72

🎮 Deploy do Projeto: (em breve)

🧠 Sobre o Projeto / About the Project

PT-BR:
O Guardião do Conhecimento é um jogo educativo que combina elementos de plataforma 2D, inteligência artificial e gamificação para promover o aprendizado de forma interativa e divertida.
O jogador explora fases, coleta artefatos e responde questões educativas enquanto a IA adapta a dificuldade conforme seu desempenho.

EN:
Knowledge Guardian is an educational game that blends 2D platforming, artificial intelligence, and gamification to create an engaging learning experience.
Players explore levels, collect artifacts, and answer educational questions, while the AI dynamically adjusts difficulty based on performance.

✨ Características Principais / Main Features
🇧🇷 Português	🇺🇸 English
🎮 Plataforma 2D com física realista (Phaser.js)	🎮 2D platform with realistic physics (Phaser.js)
📚 Questões educativas por categoria	📚 Educational questions by category
🤖 IA adaptativa baseada em desempenho	🤖 Adaptive AI based on performance
🏆 Sistema completo de gamificação e ranking	🏆 Full gamification and leaderboard system
📱 Design responsivo Mobile-First	📱 Mobile-first responsive design
🔐 Autenticação segura com JWT e bcrypt	🔐 Secure authentication with JWT and bcrypt
⚡ API RESTful robusta com Express.js	⚡ Robust RESTful API with Express.js
🧩 Integração com OpenAI API	🧩 Integration with OpenAI API
🧰 Tecnologias / Technologies
🖥️ Backend

Node.js 22

Express.js

Sequelize ORM

SQLite (dev) / PostgreSQL (prod)

JWT, bcrypt, OpenAI API

🎨 Frontend

React 18

Phaser 3.90

Vite

Axios

Tailwind CSS

shadcn/ui

📂 Estrutura do Projeto / Project Structure
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

⚙️ Instalação / Installation
🔧 Pré-requisitos / Requirements

Node.js 18+

npm ou pnpm

Git

🚀 Passos / Steps

1. Clone o repositório / Clone repository

git clone https://github.com/MarcioGil/knowledge-guardian.git
cd knowledge-guardian


2. Configure o backend / Setup backend

cd backend
npm install
cp .env.example .env
nano .env


Variáveis de ambiente / Environment variables

PORT=3000
NODE_ENV=development
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
JWT_SECRET=seu_secret_jwt_aqui
JWT_EXPIRES_IN=24h
OPENAI_API_KEY=sua_chave_openai_aqui
CORS_ORIGIN=http://localhost:5173


3. Inicialize o banco / Initialize DB

npm run init-db


4. Inicie o servidor / Start backend

npm run dev


Frontend:

cd ../frontend
pnpm install
echo "VITE_API_URL=http://localhost:3000/api" > .env
pnpm dev

🔌 API Endpoints
Endpoint	Descrição / Description
/api/auth/register	Criar conta / Register user
/api/auth/login	Login de usuário / User login
/api/content/adaptive	Conteúdo adaptativo / Adaptive content
/api/ai/hint	Dica da IA / AI hint
/api/ai/analysis	Análise de desempenho / Performance analysis
/api/progress	Progresso do jogador / Player progress
🏆 Gamificação e IA / Gamification & AI
🎯 IA Adaptativa / Adaptive AI

<40% acertos → reduz dificuldade

40–70% → mantém

>70% → aumenta

🧩 Conquistas / Achievements

🎓 Primeiro Passo — Complete o tutorial

📚 Colecionador — Colete 10 artefatos

🎯 Acerto Perfeito — 10 respostas seguidas

🧠 Gênio — 50 questões difíceis

👑 Top 10 — Entre no ranking

🔒 Segurança / Security

Senhas criptografadas com bcrypt

Tokens JWT com expiração de 24h

Validação de entrada e rate limiting

CORS e HTTPS configurados para produção

🚀 Deploy / Deployment

Backend: Railway, Heroku, AWS, DigitalOcean

Frontend: Vercel, Netlify, GitHub Pages

cd frontend
pnpm build

🧪 Testes / Tests

Backend

cd backend
npm test


Frontend

cd frontend
pnpm test

🤝 Contribuição / Contribution

Faça um fork / Fork the project

Crie sua branch / Create a branch

git checkout -b feature/MinhaFeature


Commit suas mudanças / Commit changes

git commit -m 'Adiciona MinhaFeature'


Push / Push changes

git push origin feature/MinhaFeature


Abra um Pull Request / Open a Pull Request

🗺️ Roadmap

✅ Fase 1 (MVP): IA + Gamificação + 5 fases
🚧 Fase 2: Multiplayer + Chat + Mais categorias
🧩 Fase 3: App nativo + Dashboard + Conteúdo escolar

📄 Licença / License

Este projeto está sob a licença MIT.
This project is licensed under the MIT License.

❤️ Agradecimentos / Acknowledgments

Phaser.js — Engine de jogos 2D

OpenAI — API de Inteligência Artificial

React — Biblioteca de interface

Express.js — Framework backend

shadcn/ui — Componentes modernos

🧠 Desenvolvido com ❤️ por Márcio Gil

“Educar é libertar o potencial humano por meio do conhecimento e da tecnologia.”