import { Achievement, PlayerProgress } from '../models/index.js';

const ACHIEVEMENT_DEFINITIONS = {
  FIRST_STEP: {
    type: 'tutorial',
    name: 'Primeiro Passo',
    description: 'Complete o tutorial do jogo',
    icon: '🎓'
  },
  COLLECTOR: {
    type: 'artifacts',
    name: 'Colecionador',
    description: 'Colete 10 artefatos',
    icon: '📚',
    requirement: 10
  },
  PERFECT_SCORE: {
    type: 'accuracy',
    name: 'Acerto Perfeito',
    description: '10 respostas corretas seguidas',
    icon: '🎯',
    requirement: 10
  },
  SPEEDSTER: {
    type: 'speed',
    name: 'Velocista',
    description: 'Complete uma fase em menos de 2 minutos',
    icon: '⚡'
  },
  GENIUS: {
    type: 'difficulty',
    name: 'Gênio',
    description: 'Acerte 50 questões de nível difícil',
    icon: '🧠',
    requirement: 50
  },
  TOP_TEN: {
    type: 'ranking',
    name: 'Top 10',
    description: 'Entre no top 10 do ranking',
    icon: '👑'
  },
  LEVEL_MASTER: {
    type: 'level',
    name: 'Mestre de Níveis',
    description: 'Alcance o nível 10',
    icon: '⭐',
    requirement: 10
  },
  STAGE_CONQUEROR: {
    type: 'stages',
    name: 'Conquistador de Fases',
    description: 'Complete todas as 5 fases',
    icon: '🏆',
    requirement: 5
  },
  KNOWLEDGE_SEEKER: {
    type: 'questions',
    name: 'Buscador de Conhecimento',
    description: 'Responda 100 questões corretamente',
    icon: '📖',
    requirement: 100
  },
  PERSISTENT: {
    type: 'login',
    name: 'Persistente',
    description: 'Jogue por 7 dias consecutivos',
    icon: '💪',
    requirement: 7
  }
};

export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll({
      where: { user_id: req.user.id },
      order: [['unlocked_at', 'DESC']]
    });

    const allAchievements = Object.entries(ACHIEVEMENT_DEFINITIONS).map(([key, def]) => {
      const unlocked = achievements.find(a => a.achievement_type === key);
      return {
        type: key,
        ...def,
        unlocked: !!unlocked,
        unlocked_at: unlocked?.unlocked_at || null
      };
    });

    res.json({
      success: true,
      data: {
        achievements: allAchievements,
        total: allAchievements.length,
        unlocked: achievements.length,
        progress: Math.round((achievements.length / allAchievements.length) * 100)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar conquistas:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar conquistas',
      error: error.message
    });
  }
};

export const unlockAchievement = async (req, res) => {
  try {
    const { achievement_type } = req.body;

    if (!ACHIEVEMENT_DEFINITIONS[achievement_type]) {
      return res.status(400).json({
        success: false,
        message: 'Tipo de conquista inválido'
      });
    }

    const existing = await Achievement.findOne({
      where: {
        user_id: req.user.id,
        achievement_type
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Conquista já desbloqueada'
      });
    }

    const definition = ACHIEVEMENT_DEFINITIONS[achievement_type];
    
    const achievement = await Achievement.create({
      user_id: req.user.id,
      achievement_type,
      achievement_name: definition.name,
      description: definition.description,
      icon: definition.icon
    });

    const progress = await PlayerProgress.findOne({
      where: { user_id: req.user.id }
    });

    if (progress) {
      progress.total_score += 100;
      progress.experience_points += 50;
      await progress.save();
    }

    res.json({
      success: true,
      message: `Conquista "${definition.name}" desbloqueada!`,
      data: { 
        achievement,
        bonus: {
          score: 100,
          xp: 50
        }
      }
    });
  } catch (error) {
    console.error('Erro ao desbloquear conquista:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao desbloquear conquista',
      error: error.message
    });
  }
};

export const checkAchievements = async (userId) => {
  try {
    const progress = await PlayerProgress.findOne({
      where: { user_id: userId }
    });

    if (!progress) return [];

    const newAchievements = [];

    if (progress.artifacts_collected?.length >= 10) {
      const exists = await Achievement.findOne({
        where: { user_id: userId, achievement_type: 'COLLECTOR' }
      });
      if (!exists) {
        newAchievements.push('COLLECTOR');
      }
    }

    if (progress.current_level >= 10) {
      const exists = await Achievement.findOne({
        where: { user_id: userId, achievement_type: 'LEVEL_MASTER' }
      });
      if (!exists) {
        newAchievements.push('LEVEL_MASTER');
      }
    }

    if (progress.completed_stages?.length >= 5) {
      const exists = await Achievement.findOne({
        where: { user_id: userId, achievement_type: 'STAGE_CONQUEROR' }
      });
      if (!exists) {
        newAchievements.push('STAGE_CONQUEROR');
      }
    }

    for (const type of newAchievements) {
      const definition = ACHIEVEMENT_DEFINITIONS[type];
      await Achievement.create({
        user_id: userId,
        achievement_type: type,
        achievement_name: definition.name,
        description: definition.description,
        icon: definition.icon
      });
    }

    return newAchievements;
  } catch (error) {
    console.error('Erro ao verificar conquistas:', error);
    return [];
  }
};

