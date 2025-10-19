# 📡 Documentação da API

Documentação completa dos endpoints da API REST do **Guardião do Conhecimento**.

**Base URL**: `http://localhost:3000/api` (desenvolvimento)

---

## 📋 Índice

1. [Autenticação](#autenticação)
2. [Progresso do Jogador](#progresso-do-jogador)
3. [Conquistas](#conquistas)
4. [Ranking](#ranking)
5. [Conteúdo Educativo](#conteúdo-educativo)
6. [Inteligência Artificial](#inteligência-artificial)
7. [Códigos de Status](#códigos-de-status)
8. [Exemplos de Uso](#exemplos-de-uso)

---

## 🔐 Autenticação

Todos os endpoints protegidos requerem um token JWT no header:

```
Authorization: Bearer <token>
```

### POST /auth/register

Criar uma nova conta de usuário.

**Request Body**:
```json
{
  "username": "jogador123",
  "email": "jogador@example.com",
  "password": "senha123"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "user": {
      "id": "uuid-v4",
      "username": "jogador123",
      "email": "jogador@example.com",
      "created_at": "2025-01-19T15:30:00.000Z",
      "updated_at": "2025-01-19T15:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validações**:
- Username: 3-30 caracteres alfanuméricos
- Email: formato válido
- Senha: mínimo 6 caracteres

---

### POST /auth/login

Fazer login e obter token JWT.

**Request Body**:
```json
{
  "username": "jogador123",
  "password": "senha123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": "uuid-v4",
      "username": "jogador123",
      "email": "jogador@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### GET /auth/me

Obter dados do usuário autenticado.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-v4",
      "username": "jogador123",
      "email": "jogador@example.com",
      "progress": {
        "current_level": 5,
        "total_score": 2500,
        "experience_points": 1200,
        "artifacts_collected": ["artifact_1", "artifact_2"],
        "completed_stages": [1, 2, 3],
        "current_stage": 4
      },
      "achievements": [...],
      "leaderboard": {...}
    }
  }
}
```

---

## 📊 Progresso do Jogador

### GET /progress

Obter progresso do jogador autenticado.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "progress": {
      "id": "uuid-v4",
      "user_id": "uuid-v4",
      "current_level": 5,
      "total_score": 2500,
      "experience_points": 1200,
      "artifacts_collected": ["artifact_1", "artifact_2", "artifact_3"],
      "completed_stages": [1, 2, 3],
      "current_stage": 4,
      "created_at": "2025-01-19T15:30:00.000Z",
      "updated_at": "2025-01-19T16:45:00.000Z"
    }
  }
}
```

---

### PUT /progress

Atualizar progresso do jogador.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "total_score": 2700,
  "experience_points": 1350,
  "current_level": 6,
  "current_stage": 4
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Progresso atualizado com sucesso",
  "data": {
    "progress": {...}
  }
}
```

---

### POST /progress/stage/complete

Completar uma fase.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "stage_number": 3,
  "score": 500,
  "artifacts": ["artifact_7", "artifact_8", "artifact_9"]
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Fase completada com sucesso",
  "data": {
    "progress": {...},
    "level_up": true
  }
}
```

---

### POST /progress/artifact/collect

Coletar um artefato.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "artifact_id": "artifact_10"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Artefato coletado com sucesso",
  "data": {
    "progress": {...}
  }
}
```

---

## 🏆 Conquistas

### GET /achievements

Listar todas as conquistas do jogador.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "achievements": [
      {
        "type": "FIRST_STEP",
        "name": "Primeiro Passo",
        "description": "Complete o tutorial",
        "icon": "🎓",
        "unlocked": true,
        "unlocked_at": "2025-01-19T15:35:00.000Z"
      },
      {
        "type": "COLLECTOR",
        "name": "Colecionador",
        "description": "Colete 10 artefatos",
        "icon": "📚",
        "requirement": 10,
        "unlocked": false,
        "unlocked_at": null
      }
    ],
    "total": 10,
    "unlocked": 3,
    "progress": 30
  }
}
```

---

### POST /achievements/unlock

Desbloquear uma conquista.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "achievement_type": "FIRST_STEP"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Conquista \"Primeiro Passo\" desbloqueada!",
  "data": {
    "achievement": {
      "id": "uuid-v4",
      "user_id": "uuid-v4",
      "achievement_type": "FIRST_STEP",
      "achievement_name": "Primeiro Passo",
      "description": "Complete o tutorial",
      "icon": "🎓",
      "unlocked_at": "2025-01-19T15:35:00.000Z"
    },
    "bonus": {
      "score": 100,
      "xp": 50
    }
  }
}
```

---

## 🥇 Ranking

### GET /leaderboard

Obter ranking global.

**Query Parameters**:
- `limit` (opcional): Número de entradas (padrão: 100)
- `offset` (opcional): Offset para paginação (padrão: 0)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "leaderboard": [
      {
        "id": "uuid-v4",
        "user_id": "uuid-v4",
        "score": 5000,
        "level": 10,
        "rank": 1,
        "user": {
          "username": "mestre_jedi"
        },
        "updated_at": "2025-01-19T16:00:00.000Z"
      },
      {
        "id": "uuid-v4",
        "user_id": "uuid-v4",
        "score": 4500,
        "level": 9,
        "rank": 2,
        "user": {
          "username": "super_estudante"
        },
        "updated_at": "2025-01-19T15:50:00.000Z"
      }
    ],
    "total": 100
  }
}
```

---

### GET /leaderboard/top

Obter top jogadores.

**Query Parameters**:
- `top` (opcional): Número de jogadores (padrão: 10)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "top_players": [...]
  }
}
```

---

### GET /leaderboard/me

Obter posição do jogador no ranking.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "my_entry": {
      "id": "uuid-v4",
      "user_id": "uuid-v4",
      "score": 2500,
      "level": 5,
      "rank": 42,
      "user": {
        "username": "jogador123"
      }
    },
    "rank": 42,
    "total_players": 500,
    "percentile": 92,
    "nearby_players": {
      "above": [...],
      "below": [...]
    }
  }
}
```

---

## 📚 Conteúdo Educativo

### GET /content

Listar conteúdo educativo.

**Query Parameters**:
- `category` (opcional): matematica, historia, ciencias, geografia, portugues
- `difficulty` (opcional): 1-5
- `stage` (opcional): número da fase
- `limit` (opcional): número de questões (padrão: 10)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "uuid-v4",
        "category": "matematica",
        "difficulty": 2,
        "question": "Quanto é 7 × 3?",
        "correct_answer": "21",
        "options": ["18", "21", "24", "27"],
        "explanation": "A multiplicação de 7 por 3 é igual a 21.",
        "stage": 1,
        "points": 150,
        "created_at": "2025-01-19T15:00:00.000Z"
      }
    ],
    "total": 1
  }
}
```

---

### GET /content/adaptive

Obter conteúdo adaptativo baseado no desempenho.

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `stage`: número da fase

**Response** (200):
```json
{
  "success": true,
  "data": {
    "content": [...],
    "adapted_difficulty": 3,
    "total": 5
  }
}
```

---

### GET /content/:id

Obter questão específica.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "content": {...}
  }
}
```

---

### POST /content/answer

Validar resposta de uma questão.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "content_id": "uuid-v4",
  "answer": "21",
  "time_taken": 8
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "correct": true,
    "correct_answer": "21",
    "explanation": "A multiplicação de 7 por 3 é igual a 21.",
    "points_earned": 150,
    "time_bonus": 50
  }
}
```

---

### GET /content/categories

Listar categorias disponíveis.

**Response** (200):
```json
{
  "success": true,
  "data": {
    "categories": [
      "matematica",
      "historia",
      "ciencias",
      "geografia",
      "portugues"
    ]
  }
}
```

---

## 🤖 Inteligência Artificial

### POST /ai/hint

Obter dica para uma questão.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "content_id": "uuid-v4"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "hint": "Pense em quantas vezes você soma 7 quando multiplica por 3."
  }
}
```

---

### POST /ai/generate

Gerar nova questão com IA.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "category": "matematica",
  "difficulty": 3,
  "topic": "frações"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Questão gerada com sucesso",
  "data": {
    "content": {
      "id": "uuid-v4",
      "category": "matematica",
      "difficulty": 3,
      "question": "Quanto é 1/2 + 1/4?",
      "correct_answer": "3/4",
      "options": ["1/2", "2/4", "3/4", "4/4"],
      "explanation": "Para somar frações, precisamos ter o mesmo denominador...",
      "stage": 0,
      "points": 150
    },
    "ai_generated": true
  }
}
```

---

### GET /ai/analysis

Obter análise de desempenho.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "analysis": {
      "feedback": "Você está indo muito bem! Continue praticando matemática para melhorar ainda mais.",
      "accuracy": 75.5,
      "weak_categories": ["historia"],
      "strong_categories": ["matematica", "ciencias"],
      "recommended_difficulty": "harder"
    },
    "current_difficulty": 3,
    "performance_data": {
      "correct_answers": 45,
      "total_answers": 60,
      "average_time": 12.5,
      "categories_performance": {
        "matematica": {
          "correct": 18,
          "total": 20
        },
        "historia": {
          "correct": 8,
          "total": 15
        }
      }
    }
  }
}
```

---

### POST /ai/explain

Obter explicação personalizada.

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "content_id": "uuid-v4",
  "user_answer": "18"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "explanation": "A resposta correta é 21 porque quando multiplicamos 7 por 3, estamos somando 7 três vezes: 7 + 7 + 7 = 21.",
    "correct_answer": "21"
  }
}
```

---

### GET /ai/learning-path

Obter sugestões de caminho de aprendizado.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "data": {
    "suggestions": "1. Revise conceitos de história brasileira\n2. Pratique mais questões de nível médio\n3. Explore a categoria de geografia",
    "current_level": 5,
    "weak_categories": ["historia"],
    "recommended_difficulty": 3
  }
}
```

---

### POST /ai/adapt

Adaptar dificuldade automaticamente.

**Headers**: `Authorization: Bearer <token>`

**Response** (200):
```json
{
  "success": true,
  "message": "Dificuldade adaptada com sucesso",
  "data": {
    "previous_difficulty": 3,
    "new_difficulty": 4,
    "accuracy": "78.5%"
  }
}
```

---

## 📊 Códigos de Status

| Código | Significado |
|--------|-------------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Token ausente ou inválido |
| 403 | Forbidden - Acesso negado |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: usuário já existe) |
| 429 | Too Many Requests - Rate limit excedido |
| 500 | Internal Server Error - Erro no servidor |

---

## 💡 Exemplos de Uso

### JavaScript (Axios)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Login
const login = async () => {
  const response = await api.post('/auth/login', {
    username: 'jogador123',
    password: 'senha123',
  });
  
  const token = response.data.data.token;
  localStorage.setItem('token', token);
};

// Obter progresso
const getProgress = async () => {
  const token = localStorage.getItem('token');
  
  const response = await api.get('/progress', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  console.log(response.data.data.progress);
};
```

### Python (requests)

```python
import requests

BASE_URL = 'http://localhost:3000/api'

# Login
response = requests.post(f'{BASE_URL}/auth/login', json={
    'username': 'jogador123',
    'password': 'senha123'
})

token = response.json()['data']['token']

# Obter progresso
headers = {'Authorization': f'Bearer {token}'}
response = requests.get(f'{BASE_URL}/progress', headers=headers)

progress = response.json()['data']['progress']
print(progress)
```

### cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"jogador123","password":"senha123"}'

# Obter progresso (substitua <TOKEN>)
curl -X GET http://localhost:3000/api/progress \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 🔒 Segurança

- Sempre use HTTPS em produção
- Tokens JWT expiram em 24 horas
- Rate limiting: 100 requisições por 15 minutos
- Senhas são hasheadas com bcrypt (salt rounds: 10)
- Validação de entrada em todos os endpoints

---

**Desenvolvido com ❤️ por Manus AI**

