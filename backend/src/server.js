import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import sequelize, { testConnection } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { Op } from 'sequelize';

// Exportar Op para uso nos controladores
export { Op };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de segurança
app.use(helmet());
app.use(compression());

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Muitas requisições deste IP, tente novamente mais tarde.'
});

app.use('/api/', limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API do Guardião do Conhecimento',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      progress: '/api/progress',
      achievements: '/api/achievements',
      leaderboard: '/api/leaderboard',
      content: '/api/content',
      ai: '/api/ai'
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/ai', aiRoutes);

// Rota de health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Tratamento de erros 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada'
  });
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erro interno do servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Inicialização do servidor
const startServer = async () => {
  try {
    await testConnection();
    
    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com o banco de dados');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

