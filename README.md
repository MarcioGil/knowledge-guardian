# 🎓 Guardião do Conhecimento / Knowledge Guardian

Um jogo educativo full-stack com IA e gamificação.
A full-stack educational game with AI and gamification.

## 👨‍💻 Autor / Author

**Márcio Gil** 🎓 Estudante de Engenharia de Software | 💼 Embaixador DIO Campus Expert
💡 Apaixonado por tecnologia, educação e projetos que unem aprendizado e inovação.

🌐 **Portfólio**: [https://marciogil.github.io/meu-portfolio_profissional/](https://marciogil.github.io/meu-portfolio_profissional/)
💻 **GitHub**: [https://github.com/MarcioGil](https://github.com/MarcioGil)
🔗 **LinkedIn**: [https://www.linkedin.com/in/marciogil72](https://www.linkedin.com/in/marciogil72)
🎮 **Deploy do Projeto**: (em breve)

## 🧠 Sobre o Projeto / About the Project

**PT-BR**: O Guardião do Conhecimento é um jogo educativo que combina elementos de plataforma 2D, inteligência artificial e gamificação para promover o aprendizado de forma interativa e divertida. O jogador explora fases, coleta artefatos e responde questões educativas enquanto a IA adapta a dificuldade conforme seu desempenho.

**EN**: Knowledge Guardian is an educational game that blends 2D platforming, artificial intelligence, and gamification to create an engaging learning experience. Players explore levels, collect artifacts, and answer educational questions, while the AI dynamically adjusts difficulty based on performance.

## ✨ Características Principais / Main Features

| 🇧🇷 Português | 🇺🇸 English |
| :--- | :--- |
| 🎮 Plataforma 2D com física realista (**Phaser.js**) | 🎮 2D platform with realistic physics (**Phaser.js**) |
| 📚 Questões educativas por categoria | 📚 Educational questions by category |
| 🤖 IA adaptativa baseada em desempenho | 🤖 Adaptive AI based on performance |
| 🏆 Sistema completo de gamificação e ranking | 🏆 Full gamification and leaderboard system |
| 📱 Design responsivo Mobile-First | 📱 Mobile-first responsive design |
| 🔐 Autenticação segura com JWT e bcrypt | 🔐 Secure authentication with JWT and bcrypt |
| ⚡ API RESTful robusta com Express.js | ⚡ Robust RESTful API with Express.js |
| 🧩 Integração com **OpenAI API** | 🧩 Integration with **OpenAI API** |

## 🧰 Tecnologias / Technologies

### 🖥️ Backend

* Node.js 22
* Express.js
* Sequelize ORM
* SQLite (dev) / PostgreSQL (prod)
* JWT, bcrypt, OpenAI API

### 🎨 Frontend

* React 18
* Phaser 3.90
* Vite
* Axios
* Tailwind CSS
* shadcn/ui

## 📂 Estrutura do Projeto / Project Structure

```bash
knowledge-guardian/
├── backend/ # API Backend
│   ├── src/
│   │   ├── config/ # Configurações (DB, JWT)
│   │   ├── controllers/ # Controladores da API
│   │   ├── models/ # Modelos do banco de dados
│   │   ├── routes/ # Rotas da API
│   │   ├── services/ # Lógica de negócio
│   │   ├── middleware/ # Middlewares (auth, validation)
│   │   ├── ai/ # Módulo de IA
│   │   └── server.js # Entry point
│   ├── package.json
│   └── .env.example
├── frontend/ # Frontend React + Phaser
│   ├── client/
│   │   ├── public/ # Assets estáticos
│   │   │   └── assets/ # Sprites, sons, mapas
│   │   ├── src/
│   │   │   ├── game/ # Engine Phaser
│   │   │   │   ├── scenes/ # Cenas do jogo
│   │   │   │   ├── entities/ # Entidades (Player, Enemy)
│   │   │   │   └── config.ts # Configuração Phaser
│   │   │   ├── pages/ # Páginas React
│   │   │   ├── components/ # Componentes UI
│   │   │   ├── contexts/ # Context API (Auth)
│   │   │   ├── services/ # API calls
│   │   │   └── App.tsx
│   │   └── package.json
├── docs/ # Documentação adicional
├── ARCHITECTURE.md # Arquitetura técnica
├── README.md # Este arquivo
└── LICENSE